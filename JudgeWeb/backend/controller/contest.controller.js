import { NoticeService } from '../service/notice.service.js';

export default class Contest {
    static getNotice = async (req, res, next) => {
        try {
            const result = await NoticeService.getNotice(req);
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'Get /contest/notice\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static createPost = async (req, res, next) => {
        try {
            await NoticeService.createPost(req);
            return res.status(200).send(true);
        } catch (err) {
            err.message = 'POST /contest/post\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static createReply = async (req, res) => {
        try {
            await NoticeService.createReply(req);
            return res.status(200).send(true);
        } catch (err) {
            err.message = 'POST /contest/reply\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
}