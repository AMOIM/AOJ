import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        required: true
    },
    memoryLimit: {
        type: Number,
        required: true
    },
    inputList: [
        {
            _id: Number,
            txt: String
        },
    ],
    outputList: [
        {
            _id: Number,
            txt: String
        }
    ],
});

const stateSchema = new mongoose.Schema({
    state: {
        type: Number,
        enum: ['Pending', 'AC', 'WA', 'TLE', 'MLE', 'RE', 'PE', 'CE', 'SE'],
        default: 1
    },
    msg: {
        type: String,
        default : '채점 중'
    },
    number: {
        type: Number,
        required : true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    problemNum: {
        type : Number,
        required: true
    },
    time: Number,
    memory: Number
});

const pendingSchema = new mongoose.Schema({
    number : {
        type : Number,
        required : true
    }
});

const ProblemSchema = new mongoose.model('ProblemSchema', problemSchema);
const StateSchema = new mongoose.model('StateSchema', stateSchema);
const PendingSchema = new mongoose.model('PendingSchema', pendingSchema);

export {
    ProblemSchema,
    StateSchema,
    PendingSchema
};