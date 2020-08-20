import { PendingModel, ProblemModel, StateModel } from '../models/judge.model';

export default class ProblemService {
    static get = async (id) => {
        try {
            return await ProblemModel.find(id);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static submit = async (data) => {
        try {
            const result = await StateModel.push(data);
            await PendingModel.push(result);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
}