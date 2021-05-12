import {StatusSchema} from './schema.model';

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
            throw new Error('Model -> push status error');
        }
    }
    static get = async (user, problem, start, end) => {
        try {
            if(typeof problem === 'undefined'){
                return await StatusSchema.find()
                    .where({'userName': user})
                    .sort('date');
            }
            else if(user === 'admin'){
                return await StatusSchema.find()
                    .where({'problemNum': problem})
                    .gte('date', start)
                    .lte('date', end)
                    .sort('date');
            }
            else {
                const result = await StatusSchema.find()
                    .where({'userName': user, 'problemNum': problem})
                    .gte('date', start)
                    .lte('date', end)
                    .sort('date');
                return result;
            }
        } catch (err) {
            throw new Error('Model -> getStatus error');
        }
    }
}