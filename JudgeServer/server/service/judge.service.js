import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';

import Compiler from '../models/compiler.model.js';
import { PendingModel, ProblemModel, StateModel } from '../models/judge.model.js';

const execSync = childProcess.execSync;
const dir = path.join(__dirname, '../../test');

const seccomp_rule = async (lang) => {
    if(lang === 'c' || lang === 'cpp') return 'c_cpp';
    else return 'general';
};

export class JudgeService {
    static run = async () => {
        let pending;
        try {
            pending = await PendingModel.front();
            if(pending === null) return;

            await Queue.place(async () => {
                try {
                    const judge = await StateModel.find(pending.number);
                    if (judge === null) {
                        Queue.next();
                        return;
                    }

                    const problem = await ProblemModel.find(judge.problemNum);
                    if (problem === null) {
                        Queue.next();
                        return;
                    }

                    const compile = await Compiler.run(judge.code, judge.lang);
                    if (compile === null) throw new Error('No Language');
                    if (compile.success === false) throw new Error('컴파일 에러');

                    let maxTime = 0, maxMemory = 0;

                    for (let i = 0; i < problem.inputList.length; i++) {
                        const maxProcessNumber = 200;
                        const maxOutputSize = 2097152;
                        const input = problem.inputList[i].txt;
                        const rule = await seccomp_rule(judge.lang);
                        fs.writeFileSync(`${dir}/input.txt`, input, 'utf8');

                        const script = `sudo ${dir}/libjudger.so --max_cpu_time=${problem.timeLimit} --max_real_time=${problem.timeLimit * 5} `
                            + `--max_memory=${problem.memoryLimit} --max_process_number=${maxProcessNumber} --max_output_size=${maxOutputSize} `
                            + `--exe_path=${dir}/test.o --input_path=${dir}/input.txt --output_path=${dir}/output.txt --error_path=${dir}/error.txt `
                            + `--uid=0 --gid=0 --seccomp_rule_name=${rule}`;

                        const stdout = execSync(script).toString();
                        const status = JSON.parse(stdout);

                        if (status.result === 1 || status.result === 2) throw new Error('시간 초과');
                        else if (status.result === 3) throw new Error('메모리 초과');
                        else if (status.result === 4) {
                            if (status.signal === 25) throw new Error('출력 형식이 잘못되었습니다');
                            else throw new Error('런타임 에러');
                        } else if (status.result !== 0) throw new Error('서버 에러');

                        const userOutput = fs.readFileSync(`${dir}/output.txt`, 'utf8').toString();
                        const ansOutput = problem.outputList[i].txt.toString();

                        const userCmp = userOutput.split('\n');
                        const ansCmp = ansOutput.split('\n');

                        while (userCmp[userCmp.length - 1] && userCmp[userCmp.length - 1].trimEnd() === '') userCmp.pop();
                        while (ansCmp[ansCmp.length - 1].trimEnd() === '') ansCmp.pop();

                        if (userCmp.length !== ansCmp.length) throw new Error('틀렸습니다');
                        for (let j = 0; j < userCmp.length; j++)
                            if (userCmp[j].trimEnd() !== ansCmp[j].trimEnd())
                                throw new Error('틀렸습니다');

                        maxTime = Math.max(maxTime, status.cpu_time);
                        maxMemory = Math.max(maxMemory, status.memory);
                    }
                    await StateModel.update(pending.number, 2, compile.stdout, maxTime, maxMemory);
                    Queue.next();
                } catch (e) {
                    let stateNum;
                    if(e.message === undefined) logger.error('Stdout is undefined');
                    else if(typeof e.message !== 'string') logger.error('Type is not String');
                    else if(e.message === '컴파일 에러') stateNum = 8;
                    else if(e.message === '시간 초과') stateNum = 4;
                    else if(e.message === '메모리 초과') stateNum = 5;
                    else if(e.message === '런타임 에러') stateNum = 6;
                    else if(e.message === '출력 형식이 잘못되었습니다') stateNum = 7;
                    else if(e.message === '틀렸습니다') stateNum = 3;
                    else if(e.message === '서버 에러') {
                        stateNum = 9;
                        logger.error('Judge Server error');
                    }

                    const result = await StateModel.update(pending.number, stateNum, -1, -1);
                    if(result === false) logger.error('Update state Error');

                    Queue.next();
                }
            });

            await PendingModel.delete(pending.number);
        } catch (e) {
            logger.error('Queue place error');
        }
    }
}