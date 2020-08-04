import { NoticeService } from '../service/notice.service.js';
import { logger } from '../config/winston.js';

export class NoticeController{
    static createPost = async (req, res) => {
        logger.info("들어옴");
        logger.info(req.body);
        const result = await NoticeService.createPost(req);
        if(result === true) return res.status(200).json({msg: "게시글 업로드를 성공하였습니다!"});
        else return res.status(400).json({msg: "게시글 업로드를 실패하였습니다!"});
    };
}