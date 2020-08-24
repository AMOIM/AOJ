import { logger } from '../config/winston';
import { NoticeSchema } from './schema.model.js';
import mongoose from 'mongoose';
import moment from 'moment';

export class NoticeModel {
    static getNotice = async (req) => {
        try{
            if(req.query.key === '0'){
                return await NoticeSchema.find({competitionNum : req.params.competitionNum, isQnA : true});
            }
            else
                return await NoticeSchema.find({competitionNum: req.params.competitionNum, isQnA : false});
        }catch (err) {
            return false;
        }
    }
    static createPost = async ({competitionNum, isQnA, problemNum, content}) => {
        try {
            const newNotice = new NoticeSchema({
                _id : new mongoose.Types.ObjectId(),
                competitionNum : competitionNum,
                isQnA : isQnA,
                problemNum : problemNum,
                content : content,
                child:{
                    content: null,
                    date: null
                },
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            await newNotice.save();
            return true;
        }catch (err) {
            logger.info('mongo err' + err);
            return false;
        }
    }
    static createReply = async ({_id, content}) => {
        try {
            const Notice = await NoticeSchema.findById(_id);
            console.log(Notice);
            if(!Notice)return false;
            Notice._id = _id;
            Notice.child.content = content;
            Notice.child.date = moment().format('YYYY-MM-DD HH:mm:ss');
            await Notice.save();
            return true;
        }catch (err) {
            return false;
        }
    }
}