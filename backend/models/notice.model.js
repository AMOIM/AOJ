import { logger } from '../config/winston';
import { NoticeSchema } from './schema.model.js';
import mongoose from 'mongoose';
import moment from 'moment';

export class NoticeModel {
    static getNotice = async (req) => {
        try{
            if(req.query.key === '0'){
                return await NoticeSchema.find({'competitionNum' : req.params.competitionNum, 'isQnA' : false});
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
}