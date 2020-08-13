import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    isQnA: {type: Boolean, required: true},
    problemNum: {type: String, required: true},
    competitionNum: {type: Number, required: true},
    content: {type: String, required: true},
    child: {
        content: {type: String, default: null},
        date: {type: Date}
    },
    date: Date
});

const NoticeSchema = new mongoose.model('notice', noticeSchema);

export {
    NoticeSchema
};