import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';

import Compiler from '../models/compiler.model.js';
import {PendingModel, ProblemModel, StatusModel} from '../models/index.model.js';

const execSync = childProcess.execSync;
const dir = path.join(__dirname, '../../test');

const seccomp_rule = async (lang) => {
    if (lang === 'c' || lang === 'cpp') return 'c_cpp';
    else return 'general';
};

const exe_path = async (lang) => {
    if (lang === 'c' || lang === 'cpp') return `${dir}/Main.o`;
    if (lang === 'java') return `/usr/bin/java -cp ${dir} -XX:MaxRAM=1024m -Djava.security.manager -Dfile.encoding=UTF-8 -Djava.security.policy=${__dirname}/../etc/java_policy -Djava.awt.headless=true Main`;
    if (lang === 'python2') return `/usr/bin/python2.7 ${dir}/Main.pyc`;
    if (lang === 'python3') return `/usr/bin/python3 ${dir}/__pycache__/Main.cpython-38.pyc`;
};

const max_memory = async (lang, memory) => {
    if(lang === 'java') return memory * 2 + 16 * 1000*1000;
    if (lang === 'python2' || lang === 'python3') return memory * 2 + 32 * 1000 * 1000;
    return memory;
};

const max_time = async (lang, time) => {
    if(lang === 'java') return time * 2 + 1000;
    if (lang === 'python2' || lang === 'python3') return time * 3 + 2000;
    return time;
};

export default class IndexService {
    static run = async () => {
        try {
            const pending = await PendingModel.front();
            if (typeof pending === 'undefined') return;

            Queue.place(async () => {
                let ceStdout;
                try {
                    const judge = await StatusModel.find(pending.number);
                    const problem = await ProblemModel.find(judge.problemNum);

                    const compile = await Compiler.run(judge.code, judge.lang);
                    if (compile.success === false) {
                        ceStdout = compile.stdout;
                        throw new Error('컴파일 에러');
                    }

                    let maxTime = 0, maxMemory = 0;

                    for (let i = 0; i < problem.inputList.length; i++) {
                        const maxProcessNumber = 200;
                        const maxOutputSize = 2097152;
                        const input = problem.inputList[i].txt;
                        const rule = await seccomp_rule(judge.lang);
                        const exePath = await exe_path(judge.lang);
                        const memoryLimit = await max_memory(judge.lang, problem.memoryLimit);
                        const timeLimit = await max_time(judge.lang, problem.timeLimit);
                        const exe = exePath.split(' ')[0];
                        let args = exePath.split(' ');
                        args.shift();
                        args.push(null);

                        fs.writeFileSync(`${dir}/input.txt`, input, 'utf8');

                        let script = `sudo ${dir}/libjudger.so ` +
                            `--max_cpu_time=${timeLimit} ` +
                            `--max_real_time=${timeLimit * 3} ` +
                            `--max_memory=${memoryLimit} ` +
                            `--max_process_number=${maxProcessNumber} ` +
                            `--max_output_size=${maxOutputSize} ` +
                            `--exe_path=${exe} ` +
                            `--input_path=${dir}/input.txt ` +
                            `--output_path=${dir}/output.txt ` +
                            `--error_path=${dir}/error.txt ` +
                            '--uid=0 ' +
                            '--gid=0 ';

                        if(judge.lang !== 'java') script += `--seccomp_rule_name=${rule} `;
                        else {
                            script += '--env=LANG=en_US.UTF-8 --env=LANGUAGE=en_US:en --env=LC_ALL=en_US.UTF-8 ';
                            script += '--memory_limit_check_only=1 ';
                        }

                        for(let i = 0; i < args.length; i++)
                            script += `--args=${args[i]} `;

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

                        while (userCmp.length > 0 && userCmp[userCmp.length - 1].trimEnd() === '') userCmp.pop();
                        while (ansCmp[ansCmp.length - 1].trimEnd() === '') ansCmp.pop();

                        if (userCmp.length !== ansCmp.length) throw new Error('틀렸습니다');
                        for (let j = 0; j < userCmp.length; j++)
                            if (userCmp[j].trimEnd() !== ansCmp[j].trimEnd())
                                throw new Error('틀렸습니다');

                        maxTime = Math.max(maxTime, status.cpu_time);
                        maxMemory = Math.max(maxMemory, status.memory);
                    }
                    await StatusModel.update(pending.number, '맞았습니다', compile.stdout, maxTime, maxMemory);
                    Queue.next();
                } catch (err) {
                    if (err.message === undefined) throw new Error('Stdout is undefined');
                    else if (typeof err.message !== 'string') throw new Error('Type is not String');
                    else if (err.message === '서버 에러') {
                        await StatusModel.update(pending.number, err.message, '', -1, -1);
                        throw new Error('Judge Server error');
                    } else if (err.message === '컴파일 에러')
                        await StatusModel.update(pending.number, err.message, ceStdout, -1, -1);
                    else if (err.message === '런타임 에러' || err.message === '틀렸습니다'
                        || err.message === '시간 초과' || err.message === '메모리 초과' || err.message === '출력 형식이 잘못되었습니다')
                        await StatusModel.update(pending.number, err.message, '', -1, -1);
                    else throw err;
                    Queue.next();
                }
            });
            return await PendingModel.delete(pending.number);
        } catch (err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
}