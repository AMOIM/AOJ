import { UserSchema, NoticeSchema, ContestSchema, PendingSchema, ProblemSchema, StatusSchema } from './schema.model.js';
import mongoose from 'mongoose';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export class NoticeModel {
    static getNotice = async (req) => {
        try{
            if(req.query.key === '0'){
                const result =  await NoticeSchema.find({competitionNum : req.params.competitionNum, isQnA : true});
                return result;
            }
            else{
                const result = await NoticeSchema.find({competitionNum: req.params.competitionNum, isQnA : false});
                return result;
            }
        } catch (err) {
            throw new Error('Model -> getNotice error');
        }
    }
    static createPost = async ({competitionNum, isQnA, problemNum, content}) => {
        try {
            const newNotice = new NoticeSchema({
                _id : new mongoose.Types.ObjectId(),
                competitionNum : competitionNum,
                isQnA : isQnA,
                problemNum : problemNum,
                content : content,
                child:{
                    content: null,
                    date: null
                },
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            await newNotice.save();
            return;
        } catch (err) {
            throw new Error('Model -> createPost error');
        }
    }
    static createReply = async ({_id, content}) => {
        try {
            const Notice = await NoticeSchema.findById(_id);
            if(!Notice) throw new Error('(not found DB)');
            Notice._id = _id;
            Notice.child.content = content;
            Notice.child.date = moment().format('YYYY-MM-DD HH:mm:ss');
            await Notice.save();
            return;
        }catch (err) {
            err.message = 'Model -> createReply error ' + err.message;
            throw err;
        }
    }
}
export class PendingModel {
    static push = async(number) => {
        try {
            const newPending = new PendingSchema({
                number : number
            });
            await newPending.save();
        } catch (err) {
            err.message = 'Model -> Push pending error';
            throw err;
        }
    }
}

export class ProblemModel {
    static find = async (number) => {
        try {
            const result = await ProblemSchema.findOne()
                .where({'number': number});
            if(result === null) throw new Error('Not exist problem');
            return result;
        } catch (err) {
            if(err.message !== 'Not exist problem')
                err.message = 'Find Problem Error';
            err.message = 'Model -> ' + err.message;
            throw err;
        }
    };
    static allFind = async () => {
        try {
            const result = await ProblemSchema.find()
                .sort('-number');
            if(result === null) throw new Error('Not exist problem');
            return result;
        } catch (err) {
            if(err.message !== 'Not exist problem')
                err.message = 'Find Problem Error';
            err.message = 'Model -> ' + err.message;
            throw err;
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
                inputList: data.inputFilesString,
                outputList: data.outputFilesString
            });

            await newProblem.save();
            return newProblem.number;
        } catch (err) {
            throw new Error('Model -> ' + err.message);
        }
    };
}

export class StatusModel {
    static push = async (data) => {
        try {
            const result = await StatusSchema.find()
                .sort('-number').limit(1);

            const max = result.length !== 0 ? result[0].number + 1 : 1;
            const newStatus = new StatusSchema({
                code : data.code,
                lang : data.lang,
                problemNum : data.problemNum,
                userName : data.userName,
                number : max,
            });

            await newStatus.save();
            return newStatus.number;
        } catch (err) {
            throw new Error('Model -> ' + err.message);
        }
    }
    static get = async (user, problem, start, end) => {
        try {
            const result = await StatusSchema.find()
                .where({ 'userName' : user , 'problemNum' : problem})
                .gte('date', start)
                .lte('date', end)
                .sort('date');
            return result;
        } catch (err) {
            throw new Error('Model -> getStatus error');
        }
    }
}

export class ContestModel {
    static get = async (number) => {
        try {
            const result = await ContestSchema.findOne()
                .where({'number': number});
            return result;
        } catch (err) {
            throw new Error('Model -> getContestNum error');
        }
    }

    static GetContest = async() => {
        try {
            const result = await ContestSchema.find()
                .sort('-start');
            return result;
        } catch(err) {
            throw new Error('Model -> getContest error');
        }
    }
    static Save = async(req) => { 
        logger.info('abcd'); 
        try {
            const result = await ContestSchema.find()
                .sort('-number').limit(1);
            const max = result.length !== 0 ? result[0].number + 1 : 1;
            const stime = await req.body.contest.start.split('.');
            const etime = await req.body.contest.end.split('.');
            const newContest = new ContestSchema({
                title : req.body.contest.title, 
                number : max, 
                problemNum : req.body.contest.problems, 
                userList : req.body.contest.users, 
                start : new Date(stime[0],stime[1]-1,stime[2],stime[3],stime[4]), 
                end : new Date(etime[0],etime[1]-1,etime[2],etime[3],etime[4])
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

export class UserModel {
    static login = async(id, pw) => {
        try {
            const user = await UserSchema.findOne({id: id, password: pw});
            if(user === null) return false;
            else return user.name;
        } catch(err) {
            err.message = 'Model -> login err';
            throw err;
        }
    };
  
    static signup = async(id, name, pw) => {
        const newUser = new UserSchema({
            id : id,
            name : name,
            password : pw    
        });
        try {
            const result = await UserSchema.findOne({id: id});
            if(result===null) {
                await newUser.save();
                return 1; 
            }
            else return 2;
        }catch(err) {
            err.message = 'Model -> signup err';
            throw err;  
        }
    };
  
    static createtoken = async(id,name) => {
        try {
            const token = jwt.sign({
                id, name
            }, process.env.SECRET_KEY, {
                expiresIn: '5h'
            });
            return token;
        } catch(err) {
            err.message = 'Model -> createtoken err';
            throw err;
        }
    }
}
