import { ContestModel, ProblemModel, UserModel } from '../models/index.model.js';

export default class ContestService {
    static Save = async(req) => {
        try {
            for(let id of req.body.contest.idList){
                await UserModel.get(id);
            }

            const contest = {
                ...req.body.contest
            };

            await ContestModel.Save(req);
            await ProblemModel.updateOpenTime(contest.problems, contest.start);

        } catch(err) {
            err.message = 'Service -> contestsave err';
            throw err;
        }
    } 

    static Get = async() => {
        try{
            const result = await ContestModel.GetContest();
            return result;
        } catch(err) {
            err.message = 'Service -> contestget err';
            throw err;
        }
    }
    static getOne = async(number) => {
        try{
            const result = await ContestModel.get(number);
            return result;
        } catch(err) {
            err.message = 'Service -> contestfindone err';
            throw err;
        }
    }
    static getUserList = async(number) => {
        try{
            const result = await ContestModel.getUserList(number);
            return result;
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static getTime = async(number) => {
        try{
            const result = await ContestModel.getTime(number);
            return result;
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static update = async(req) => {
        try{
            for(let id of req.body.contest.idList){
                await UserModel.get(id);
            }

            const contest = {
                ...req.body.contest
            };

            const result = await ContestModel.update(req);
            await ProblemModel.updateOpenTime(contest.problemList, contest.start);

            return result;
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static delete = async(number) => {
        try{
            const result = await ContestModel.delete(number);
            return result;
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }

}

