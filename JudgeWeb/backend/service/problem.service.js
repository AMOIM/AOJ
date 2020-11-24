import { PendingModel, ProblemModel, StatusModel, ContestModel } from '../models/index.model.js';

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
            const result = await StatusModel.push(data);
            await PendingModel.push(result);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static create = async (data) => {
        try {
            return await ProblemModel.create(data);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getProblemList = async (competitionNum) => {
        try {
            return await ContestModel.getProblemList(competitionNum);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getAll = async () => {
        try {
            return await ProblemModel.allFind();
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
}