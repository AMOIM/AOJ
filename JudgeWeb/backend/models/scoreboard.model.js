import { ContestSchema, StateSchema } from './schema.model.js';

export default class ScoreboardModel {
    static getContest = async (number) => {
        try {
            const result = await ContestSchema.findOne()
                .where({'number': number});
            return result;
        } catch (err) {
            throw new Error('Model -> getContest error');
        }
    }
    static getState = async (user, problem, start, end) => {
        try {
            const result = await StateSchema.find()
                .where({ 'userName' : user , 'problemNum' : problem})
                .gte('date', start)
                .lte('date', end)
                .sort('date');
            return result;
        } catch (err){
            throw new Error('Model -> getState error');
        }
    }
}

