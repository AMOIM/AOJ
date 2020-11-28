import { ContestModel, StatusModel } from '../models/index.model.js';

export default class StatusService {
    static get = async (number, user) => {
        try {
            let result;
            if(parseInt(number) === 0){
                result = await StatusModel.get(user);
            }
            else {
                const contest = await ContestModel.get(number);

                const problemList = contest.problemNum;
                const start = contest.start;
                const end = contest.end;
                result = new Array;

                for (let i = 0; i < problemList.length; i++) {
                    const status = await StatusModel.get(user, problemList[i], start, end);
                    if (status === null) continue;
                    for (let j = 0; j < status.length; j++) {
                        result.push(status[j]);
                    }
                }
            }
            await result.sort(  (a, b) => {
                return b.date - a.date;
            });
            return result;
        } catch (err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }

    }
}