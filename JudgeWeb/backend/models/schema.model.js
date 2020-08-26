import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    isQnA: {type: Boolean, required: true},
    problemNum: {type: String, required: true},
    competitionNum: {type: Number, required: true},
    content: {type: String, required: true},
    child: {
        content: {type: String, default: null},
        date: {type: String}
    },
    date: {type: String}
});

const contestSchema = new mongoose.Schema({
    number : {
        type : Number,
        required : true,
        unique : true
    },
    problemNum : [ Number ],
    userList : [ String ],
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    }
});

const NoticeSchema = new mongoose.model('notice', noticeSchema);
const ContestShema = new mongoose.model('contest', contestSchema);

export {
    NoticeSchema,
    ContestShema
};