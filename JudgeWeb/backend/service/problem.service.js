import {PendingModel} from '../models/pending.model.js';
import {ProblemModel} from '../models/problem.model.js';
import {StatusModel} from '../models/status.model.js';

export default class ProblemService {
    static get = async (id) => {
        try {
            return await ProblemModel.find(id);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }

    static getPublic = async (id) => {
        try {
            return await ProblemModel.findPublic(id);
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
    static getAll = async () => {
        try {
            return await ProblemModel.allFind();
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getAllPublic = async () => {
        try {
            return await ProblemModel.allFindPublic();
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static delete = async(number) => {
        try{
            return await ProblemModel.delete(number);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static update = async (data, id) => {
        try {
            await ProblemModel.update(data, id);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getTestcase = async (number) => {
        try {
            return await ProblemModel.getTestcase(number);
        } catch (err) {
            throw new Error('Service -> ' + err.message);
        }
    }
    static getTestcaseExample = async (number) => {
        try {
            return await ProblemModel.getTestcaseExample(number);
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
            return ProblemModel.deleteTestcase(number);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }
}