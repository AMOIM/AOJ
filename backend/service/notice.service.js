import { NoticeModel } from '../models/notice.model.js';
import { logger } from '../config/winston.js';

export class NoticeService {
    static createPost = async (req) => {
        const result = await NoticeModel.createPost({...req.body});
        if(result === true) return true;
        else return false;
    };
}