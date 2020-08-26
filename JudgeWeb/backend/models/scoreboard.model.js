import { ContestSchema, StatusSchema } from './schema.model.js';

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
    static getStatus = async (user, problem, start, end) => {
        try {
            const result = await StatusSchema.find()
                .where({ 'userName' : user , 'problemNum' : problem})
                .gte('date', start)
                .lte('date', end)
                .sort('date');
            return result;
        } catch (err){
            throw new Error('Model -> getStatus error');
        }
    }
}

