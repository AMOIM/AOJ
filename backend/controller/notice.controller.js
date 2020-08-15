import { NoticeService } from '../service/notice.service.js';
import { logger } from '../config/winston.js';
import url from 'url';
import { NoticeSchema } from '../models/schema.model.js';

export class NoticeController{
    static getNotice = async (req, res) => {
        const result = await NoticeService.getNotice(req);
        logger.info(result);
        if(result !== false)return res.status(200).json(result);
        else return res.status(400).json();

    }
    static createPost = async (req, res) => {
        const result = await NoticeService.createPost(req);
        if(result === true) return res.status(200).json({msg: "게시글 업로드를 성공하였습니다!"});
        else return res.status(400).json({msg: "게시글 업로드를 실패하였습니다!"});
    };
}