import mongoose from 'mongoose';
import { logger } from '../config/winston';

const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    isQnA: {type: Boolean, required: true},
    problemNum: {type: Number, required: true, unique: true},
    competitionNum: {type: Number, required: true},
    content: {type: String, required: true},
    date: {type: Date}
});

const notice = new mongoose.model('notice', noticeSchema);

export class NoticeModel {
    static createPost = ({competitionNum, isQnA, problemNum, content}) => {
        const newNotice = new notice({
            competitionNum : competitionNum,
            isQnA : isQnA,
            problemNum : problemNum,
            content : content
        });
        newNotice
        .save()
        .then(result => {
            logger.info(result);
            return true;
        })
        .catch(err => {
            logger.info(1);
            return false;
        })
    }
}