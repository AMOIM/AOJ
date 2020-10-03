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
        fs.writeFileSync(`${dir}/Main.c`, code, 'utf8');
        const script = `/usr/bin/gcc -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c99 ${dir}/Main.c -static -lm -o ${dir}/Main.o`;
        return cmd(script);
    },
    'cpp': (code) => {
        fs.writeFileSync(`${dir}/Main.cc`, code, 'utf8');
        const script = `/usr/bin/g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c++17 ${dir}/Main.cc -static -lm -o ${dir}/Main.o`;
        return cmd(script);
    },
    'java' : (code) => {
        fs.writeFileSync(`${dir}/Main.java`, code, 'utf8');
        const script = `/usr/bin/javac ${dir}/Main.java -d ${dir} -encoding UTF8`;
        return cmd(script);
    },
    'python2' : (code) => {
        fs.writeFileSync(`${dir}/Main.py`, code, 'utf8');
        const script = `/usr/bin/python2.7 -m py_compile ${dir}/Main.py`;
        return cmd(script);
    },
    'python3' : (code) => {
        fs.writeFileSync(`${dir}/Main.py`, code, 'utf8');
        const script = `/usr/bin/python3 -m py_compile ${dir}/Main.py`;
        return cmd(script);
    }
};

export default class compiler{
    constructor() {
        ret.success = true;
        ret.stdout = '';
    }

    static run = async (code, lang) => {
        if(compile[lang] === undefined) throw new Error('No Language');
        return compile[lang](code);
    }
}