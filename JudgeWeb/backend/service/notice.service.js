import { NoticeModel } from '../models/notice.model.js';

export class NoticeService {
    static getNotice = async (req) => {
        try {
            return await NoticeModel.getNotice(req);
        } catch (err) {
            throw new Error('Service -> getNotice error ' + err.message);
        }
    }
    static createPost = async (req) => {
        try {
            await NoticeModel.createPost({ ...req.body });
            return;
        } catch (err) {
            throw new Error('Service -> createPost error ' + err.message);
        }
    }
    static createReply = async (req) => {
        try {
            await NoticeModel.createReply({ ...req.body });
            return;
        } catch (err) {
            throw new Error('Service -> createReply error ' + err.message);
        }
    }
}