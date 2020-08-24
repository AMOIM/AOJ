import { NoticeModel } from '../models/notice.model.js';
import { logger } from '../config/winston.js';
import { NoticeSchema } from '../models/schema.model.js';

export class NoticeService {
    static getNotice = async (req) => {
        const result = await NoticeModel.getNotice(req);
        if (result !== false) return result;
        else return false;
    }
    static createPost = async (req) => {
        const result = await NoticeModel.createPost({ ...req.body });
        if (result === true) return true;
        else return false;
    }
    static createReply = async (req) => {
        logger.info('서비스');
        const result = await NoticeModel.createReply({ ...req.body });
        if (result === true) return true;
        else return false;
    }
}