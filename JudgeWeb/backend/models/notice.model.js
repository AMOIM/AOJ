import {NoticeSchema} from './schema.model';
import mongoose from 'mongoose';
import moment from 'moment';

export class NoticeModel {
    static getNotice = async (req) => {
        try{
            if(req.query.key === '0'){
                return await NoticeSchema.find({competitionNum: req.query.competitionNum, isQnA: true});
            }
            else{
                return await NoticeSchema.find({competitionNum: req.query.competitionNum, isQnA: false});
            }
        } catch (err) {
            throw new Error('Model -> getNotice error');
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
                date: new Date(Date.now())
            });
            await newNotice.save();
        } catch (err) {
            throw new Error('Model -> createPost error');
        }
    }
    static createReply = async ({_id, content}) => {
        try {
            const Notice = await NoticeSchema.findById(_id);
            if(!Notice) {
                throw new Error('(not found DB)');
            }
            Notice._id = _id;
            Notice.child.content = content;
            Notice.child.date = new Date(Date.now());
            await Notice.save();
        }catch (err) {
            err.message = 'Model -> createReply error ' + err.message;
            throw err;
        }
    }
}