import {NoticeModel} from '../models/notice.model.js';
import {ContestModel} from '../models/contest.model.js';

export class NoticeService {
    static getNotice = async (req) => {
        try {
            return await NoticeModel.getNotice(req);
        } catch (err) {
            throw new Error('Service -> getNotice error -> ' + err.message);
        }
    }
    static createPost = async (req) => {
        try {
            const number = String(req.body.competitionNum);
            const contestInfo = await ContestModel.get(number);
            const currentTime = Date.now();
            const contestStart = Date.parse(contestInfo.start);
            const contestEnd = Date.parse(contestInfo.end);
            if(req.body.isQnA === false && currentTime <= contestStart)
                return await NoticeModel.createPost({ ...req.body });
            else if(contestStart <= currentTime && currentTime <= contestEnd)
                return await NoticeModel.createPost({ ...req.body });
        } catch (err) {
            throw new Error('Service -> createPost error -> ' + err.message);
        }
    }
    static createReply = async (req) => {
        try {
            const number = String(req.body.competitionNum);
            const contestInfo = await ContestModel.get(number);
            const currentTime = Date.now();
            const contestStart = Date.parse(contestInfo.start);
            const contestEnd = Date.parse(contestInfo.end);
            if(contestStart <= currentTime && currentTime <= contestEnd)
                return await NoticeModel.createReply({ ...req.body });
        } catch (err) {
            throw new Error('Service -> createReply error -> ' + err.message);
        }
    }
}