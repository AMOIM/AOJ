import { StateSchema } from './schema.model.js';
import { ProblemSchema } from './schema.model.js';
import { PendingSchema } from './schema.model.js';

export class PendingModel {
    static front = async () => {
        try {
            const result = await PendingSchema.find()
                .sort('number').limit(1);
            if (result.length === 0) throw new Error('No pending');
            return result[0];
        } catch (e) {
            if (e.message !== 'No pending')
                logger.error('Pending front Error');
            return null;
        }
    };
    static delete = async(number) => {
        try {
            await PendingSchema
                .deleteOne()
                .where({'number' : number});
        } catch (e) {
            logger.error('Delete pending error');
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
        } catch (e) {
            if(e.message === 'Not exist problem')
                logger.error(e.message);
            else logger.error('Find Problem Error');
            return null;
        }
    };
}

export class StateModel {
    static find = async (number) => {
        try {
            const result = await StateSchema.findOne()
                .where({'number': number});
            if(result === null) throw new Error('Not found state');
            return result;
        } catch (e) {
            if(e.message === 'Not found state')
                logger.error('Not found state');
            else logger.error('Find State Error');
            return null;
        }
    };
    static update = async (number, state, msg, time, memory) => {
        try {
            const result = await StateSchema.updateOne(
                {'number' : number},
                {$set : { 'msg' : msg, 'state' : state, 'time' : time, 'memory' : memory }});
            if(result === null) throw new Error('Update state error');
            return true;
        } catch (e) {
            logger.error(e.message);
            return false;
        }
    }
}