import {ContestSchema} from './schema.model';
import {ProblemModel} from './problem.model';

export class ContestModel {
    static get = async (number) => {
        try {
            return await ContestSchema.findOne()
                .where({'number': number});
        } catch (err) {
            throw new Error('Model -> getContestNum error');
        }
    }
    static getUserList = async (number) => {
        try {
            const result = await ContestSchema.findOne().select({userList : 1})
                .where({'number': number});
            return result.userList;
        } catch (err) {
            throw new Error('Model -> getUserList error');
        }
    }
    static getTime = async (number) => {
        try {
            const result = await ContestSchema.findOne().select({start : 1, end : 1})
                .where({'number': number});
            return result;
        } catch (err) {
            throw new Error('Model -> getTime error');
        }
    }
    static update = async (req) => {
        try {
            const contest = {
                ...req.body.contest
            };
            let problemNumber = [];

            for(let problem of contest.problemList)
                problemNumber.push(problem.number);

            await ContestSchema.updateOne(
                {
                    number : contest.number
                },
                {
                    $set : {
                        title : contest.title,
                        problemNum : problemNumber,
                        userList : contest.userList,
                        idList : contest.idList,
                        start : new Date(contest.start),
                        end : new Date(contest.end)
                    }
                }
            );
        } catch (err) {
            throw new Error('Model -> updateContest error');
        }
    }
    static delete = async (number) => {
        try {
            await ContestSchema.remove()
                .where({'number': number});
            return true;
        } catch (err) {
            throw new Error('Model -> deleteContest error');
        }
    }

    static getContest = async() => {
        try {
            return await ContestSchema.find().select({number: 1, title: 1, start: 1, end: 1})
                .sort('-start');
        } catch(err) {
            throw new Error('Model -> getContest error');
        }
    }
    static save = async(req) => {
        try {
            const result = await ContestSchema.find()
                .sort('-number').limit(1);
            const max = result.length !== 0 ? result[0].number + 1 : 1;

            const contest = {
                ...req.body.contest
            };
            let problemList = [];

            for(let problem of contest.problems)
                problemList.push(problem.number);

            const newContest = new ContestSchema({
                title : contest.title,
                number : max,
                problemNum : problemList,
                userList : contest.users,
                idList : contest.idList,
                start : new Date(contest.start),
                end : new Date(contest.end)
            });
            await newContest.save();
            return true;
        } catch(err) {
            err.message = 'Model -> contestsave';
            throw err;
        }
    }
    static getProblemList = async (competitionNum) => {
        try {
            const result = await ContestSchema.findOne()
                .where({'number': competitionNum});
            const problemNumList = result.problemNum;
            const problems = [];
            let cnt = 65;
            for (let i of problemNumList) {
                const problem = await ProblemModel.find(i);
                problems.push({'alphabet' : String.fromCharCode(cnt), 'number' : problem.number, 'title' : problem.title});
                cnt++;
            }
            return problems;
        } catch (err) {
            throw new Error('Model -> getProblemList error');
        }
    }
}