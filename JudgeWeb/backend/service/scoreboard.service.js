import {ContestModel} from '../models/contest.model.js';
import {StatusModel} from '../models/status.model.js';

export default class ScoreboardService {
    static get = async (number) => {
        try {
            const contest = await ContestModel.get(number);
            const users = contest.userList;
            if(users === null) throw new Error('user not found');

            const problemList = contest.problemNum;
            const start = contest.start;
            const end = contest.end;

            const result = [];

            for(let i = 0; i < users.length; i++){
                const obj = {
                    userName : users[i],
                    problemList : [],
                    penaltySum : 0,
                    acceptCnt : 0
                };
                for(let j = 0; j < problemList.length; j++) {
                    obj.problemList.push({
                        submitCnt : 0,
                        penalty : 0,
                        accept : false
                    });
                    const status = await StatusModel.get(users[i], problemList[j], start, end);
                    if(status === null) continue;
                    let time = 0;
                    for(let k = 0; k < status.length; k++) {
                        obj.problemList[j].submitCnt++;
                        if (status[k].status === '맞았습니다') {
                            obj.problemList[j].accept = true;
                            time = Math.round((status[k].date - start) / 60 / 1000);
                            break;
                        }
                    }
                    obj.problemList[j].penalty = Math.max(0, time + (obj.problemList[j].submitCnt - 1) * 20);
                    obj.penaltySum += obj.problemList[j].penalty;
                    if(obj.problemList[j].accept === true) obj.acceptCnt++;
                }
                result.push(obj);
            }
            await result.sort((a,b)=>{
                if(a.acceptCnt === b.acceptCnt)
                    return a.penaltySum - b.penaltySum;
                return b.acceptCnt - a.acceptCnt;
            });
            return result;
        } catch (err){
            throw new Error('Service -> ' + err.message);
        }
    }
}
