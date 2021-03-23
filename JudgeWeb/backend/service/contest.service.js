import { ContestModel, UserModel } from '../models/index.model.js';

export default class ContestService {
    static Save = async(req) => {
        try {
            for(let id of req.body.contest.users){
                await UserModel.get(id);
            }
            const result = await ContestModel.Save(req);
            if (result === true) return true;
            else return false;
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
            err.message = 'Service -> contestfinduserlist err';
            throw err;
        }
    }
    static getTime = async(number) => {
        try{
            const result = await ContestModel.getTime(number);
            return result;
        } catch(err) {
            err.message = 'Service -> contestfindtime err';
            throw err;
        }
    }
    static update = async(req) => {
        try{
            for(let id of req.body.contest.userList){
                await UserModel.get(id);
            }
            const result = await ContestModel.update(req);
            return result;
        } catch(err) {
            err.message = 'Service -> contestupdate err -> ' + err.message;
            throw err;
        }
    }
    static delete = async(number) => {
        try{
            const result = await ContestModel.delete(number);
            return result;
        } catch(err) {
            err.message = 'Service -> contestdelete err';
            throw err;
        }
    }

}

