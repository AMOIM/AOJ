import { PendingSchema, ProblemSchema, StatusSchema } from './schema.model.js';

export class PendingModel {
    static push = async(number) => {
        try {
            const newPending = new PendingSchema({
                number : number
            });

            await newPending.save();
        } catch (err) {
            err.message = 'Model -> Push pending error';
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
    static push = async (data) => {
        try {
            const result = await StatusSchema.find()
                .sort('-number').limit(1);

            const max = result.length !== 0 ? result[0].number + 1 : 1;
            const newStatus = new StatusSchema({
                code : data.code,
                lang : data.lang,
                problemNum : data.problemNum,
                userName : data.userName,
                number : max,
            });

            await newStatus.save();
            return newStatus.number;
        } catch (err) {
            throw new Error('Model -> ' + err.message);
        }
    }
}