import {ContestModel} from '../models/contest.model.js';
import {ProblemModel} from '../models/problem.model.js';
import {UserModel} from '../models/user.model.js';

export default class ContestService {
    static save = async(req) => {
        try {
            for(let id of req.body.contest.idList){
                await UserModel.get(id);
            }

            const contest = {
                ...req.body.contest
            };

            await ContestModel.save(req);
            await ProblemModel.updateOpenTime(contest.problems, contest.start);

        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    } 

    static get = async() => {
        try{
            return await ContestModel.getContest();
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static getOne = async(number) => {
        try{
            return await ContestModel.get(number);
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static getUserList = async(number) => {
        try{
            return await ContestModel.getUserList(number);
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static getTime = async(number) => {
        try{
            return await ContestModel.getTime(number);
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
    static getProblemList = async (competitionNum) => {
        try {
            return await ContestModel.getProblemList(competitionNum);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
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
            return await ContestModel.delete(number);
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }

}

