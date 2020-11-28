import { ContestModel } from '../models/index.model.js';

export default class ContestService {
    static Save = async(req) => {
        try {
            const result = await ContestModel.Save(req);
            logger.info(result);
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
    static update = async(req) => {
        try{
            const result = await ContestModel.update(req);
            return result;
        } catch(err) {
            err.message = 'Service -> contestupdate err';
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

