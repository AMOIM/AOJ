import { NoticeSchema } from './schema.model.js';
import mongoose from 'mongoose';
import moment from 'moment';

export class IndexModel {
    static getNotice = async (req) => {
        try{
            if(req.query.key === '0'){
                const result =  await NoticeSchema.find({competitionNum : req.params.competitionNum, isQnA : true});
                return result;
            }
            else{
                const result = await NoticeSchema.find({competitionNum: req.params.competitionNum, isQnA : false});
                return result;
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
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            });
            await newNotice.save();
            return;
        } catch (err) {
            throw new Error('Model -> createPost error');
        }
    }
    static createReply = async ({_id, content}) => {
        try {
            const Notice = await NoticeSchema.findById(_id);
            if(!Notice) throw new Error('(not found DB)');
            Notice._id = _id;
            Notice.child.content = content;
            Notice.child.date = moment().format('YYYY-MM-DD HH:mm:ss');
            await Notice.save();
            return;
        }catch (err) {
            err.message = 'Model -> createReply error ' + err.message;
            throw err;
        }
    }
}