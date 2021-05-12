import {ProblemSchema, TestCaseSchema} from './schema.model';

export class ProblemModel {
    static find = async (number) => {
        try {
            return await ProblemSchema.findOne()
                .where({'number': number});
        } catch (err) {
            err.message = 'Model -> Find problem Error';
            throw err;
        }
    };

    static findPublic = async (number) => {
        try {
            return await ProblemSchema.findOne()
                .where({'number': number, 'open': true})
                .lte('openTime', new Date());
        } catch (err) {
            err.message = 'Model -> Find problem Error';
            throw err;
        }
    };

    static allFind = async () => {
        try {
            return await ProblemSchema.find()
                .sort('-number');
        } catch (err) {
            throw new Error('Model -> All Find problem Error');
        }
    };

    static allFindPublic = async () => {
        try {
            const result = await ProblemSchema.find()
                .where('open', true)
                .lte('openTime', new Date())
                .sort('-number');
            return result;
        } catch (err) {
            throw new Error('Model -> All Find Public problem Error');
        }
    };

    static create = async (data) => {
        try {
            const result = await ProblemSchema.find()
                .sort('-number').limit(1);
            const max = result.length !== 0 ? result[0].number + 1 : 1;
            const newProblem = new ProblemSchema({
                number: max,
                title: data.problemTitle,
                description: data.problemContent,
                timeLimit: data.problemTime,
                memoryLimit: data.problemMemory,
                inputDescription: data.inputDescription,
                outputDescription: data.outputDescription,
                open : data.open
            });
            await newProblem.save();
            return newProblem.number;
        } catch (err) {
            throw new Error('Model -> ' + err.message);
        }
    };
    static delete = async (number) => {
        try {
            await ProblemSchema.remove()
                .where({'number': number});
            return true;
        } catch (err) {
            throw new Error('Model -> deleteProblem error');
        }
    };
    static update = async (data, id) => {
        try {
            await ProblemSchema.updateOne(
                {
                    number : id
                },
                {
                    $set : {
                        title: data.problemTitle,
                        description: data.problemContent,
                        timeLimit: data.problemTime,
                        memoryLimit: data.problemMemory,
                        inputDescription: data.inputDescription,
                        outputDescription: data.outputDescription,
                        open : data.open
                    }
                }
            );
        }catch (err) {
            throw new Error('Model -> updateProblem error');
        }
    };
    static getTestcase = async (number) => {
        try {
            return await TestCaseSchema.find()
                .where({'number': number})
                .sort('index');
        } catch (err) {
            throw new Error('Model -> getTestcase error');
        }
    }
    static getTestcaseExample = async (number) => {
        try {
            return await TestCaseSchema.find()
                .where({'number': number})
                .sort('index')
                .limit(2);
        } catch (err) {
            throw new Error('Model -> getTestcaseExample error');
        }
    }
    static createTestcase = async (data) => {
        try {
            const newProblemTestCase = new TestCaseSchema({
                number: data.number,
                index: data.index,
                in: data.inputFilesString,
                out: data.outputFilesString
            });
            await newProblemTestCase.save();
        } catch (err) {
            throw new Error('Model -> createTestcase error');
        }
    };
    static deleteTestcase = async (number) => {
        try {
            await TestCaseSchema.remove()
                .where({'number': number});
            return true;
        } catch (err) {
            throw new Error('Model -> deleteTestcase error');
        }
    }
    static updateOpenTime = async (problems, openTime) => {
        try {
            for(let problem of problems){
                await ProblemSchema.updateOne(
                    {
                        number : problem.number
                    },
                    {
                        $set : {
                            openTime : openTime
                        }
                    }
                );
            }
        } catch (err) {
            throw new Error('Model -> update open time error');
        }
    }
}