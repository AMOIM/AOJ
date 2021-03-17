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
    static delete = async(number) => {
        try{
            const result = await ProblemModel.delete(number);
            return result;
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static update = async (req) => {
        try {
            const result = await ProblemModel.update(req);
            return result;
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getTestcase = async (number) => {
        try {
            const result = await ProblemModel.getTestcase(number);
            return result;
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getTestcaseExample = async (number) => {
        try {
            const result = await ProblemModel.getTestcaseExample(number);
            return result;
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static createTestcase = async (data) => {
        try {
            for(let i = 0; i < data.inputFilesString.length; i++){
                const testcase = {
                    number : data.number,
                    index : i+1,
                    inputFilesString : data.inputFilesString[i],
                    outputFilesString : data.outputFilesString[i]
                };
                await ProblemModel.createTestcase(testcase);
            }
            return data.number;
        } catch (err) {
            await ProblemModel.delete(data.number);
            throw new Error('Service -> ' + err.message);
        }
    }
    static deleteTestcase = async (number) => {
        try {
            const result = ProblemModel.deleteTestcase(number);
            return result;
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
}