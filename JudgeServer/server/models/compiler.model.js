import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';

const execSync = childProcess.execSync;
const dir = path.join(__dirname, '../../test');

const ret = {
    success: Boolean,
    stdout: String
};

const cmd = (script) => {
    try {
        ret.success = true;
        ret.stdout = execSync(script).toString();
    } catch (e) {
        ret.success = false;
    }
    return ret;
};

const compile = {
    'c': (code) => {
        fs.writeFileSync(`${dir}/test.c`, code, 'utf8');
        const script = `gcc ${dir}/test.c -o ${dir}/test.o -Wall -O2 -lm -static -std=c99 -DONLINE_JUDGE -DBOJ`;
        return cmd(script);
    },
    'cpp': (code) => {
        fs.writeFileSync(`${dir}/test.cc`, code, 'utf8');
        const script = `g++ ${dir}/test.cc -o ${dir}/test.o -Wall -O2 -lm -static -std=gnu++17 -DONLINE_JUDGE -DBOJ`;
        return cmd(script);
    }
};

export default class compiler{
    constructor() {
        ret.success = true;
        ret.stdout = '';
    }

    static run = async (code, lang) => {
        if(compile[lang] === undefined) return null;
        return compile[lang](code);
    }
}