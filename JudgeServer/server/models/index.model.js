import { StatusSchema, ProblemSchema, PendingSchema, TestCaseSchema } from './schema.model.js';

export class PendingModel {
    static front = async () => {
        try {
            const result = await PendingSchema.find()
                .sort('number').limit(1);
            return result[0];
        } catch (err) {
            err.message = 'Model -> Pending front error';
            throw err;
        }
    };
    static delete = async(number) => {
        try {
            await PendingSchema
                .deleteOne()
                .where({'number' : number});
        } catch (err) {
            err.message = 'Model -> Delete pending error';
            throw err;
        }
    }
}

export class ProblemModel {
    static find = async (number) => {
        try {
            const result = await ProblemSchema.findOne()
                .where({'number': number});
            if(result === null) throw new Error('Not exist problem');
            return result;
        } catch (err) {
            if(err.message !== 'Not exist problem')
                err.message = 'Find Problem Error';
            err.message = 'Model -> ' + err.message;
            throw err;
        }
    };
}

export class StatusModel {
    static find = async (number) => {
        try {
            const result = await StatusSchema.findOne()
                .where({'number': number});
            if(result === null) throw new Error('Not found status');
            return result;
        } catch (err) {
            if(err.message !== 'Not found status')
                err.message = 'Find Status Error';
            err.message = 'Model -> ' + err.message;
            throw err;
        }
    };
    static update = async (number, status, msg, time, memory) => {
        try {
            const result = await StatusSchema.updateOne(
                {'number' : number},
                {$set : { 'message' : msg, 'status' : status, 'time' : time, 'memory' : memory }});
            if(result === null) throw new Error('Update status error');
        } catch (err) {
            throw new Error('Model -> ' + err.message);
        }
    }
}

export class TestCaseModel {
    static find = async (number) => {
        try {
            const result = await TestCaseSchema.find()
                .where({'number': number});
            if(result.length === 0) throw new Error('Find TestCase error');
            return result;
        } catch (err) {
            err.message = 'Model -> ' + err.message;
            throw err;
        }
    };
}