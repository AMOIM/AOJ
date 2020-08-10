import { logger } from '../config/winston';
import { NoticeSchema } from './schema.model.js';
import mongoose from 'mongoose';

export class NoticeModel {
    static createPost = async ({competitionNum, isQnA, problemNum, content}) => {
        try {
            const newNotice = new NoticeSchema({
                _id : new mongoose.Types.ObjectId(),
                competitionNum : competitionNum,
                isQnA : isQnA,
                problemNum : problemNum,
                content : content,
                date: new Date()
            });
            await newNotice.save();
            return true;
        }catch (err) {
            logger.info('mongo err' + err);
            return false;
        }
    }
}