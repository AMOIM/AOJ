import ProblemService from '../service/problem.service.js';

export default class Problem {
    static get = async (req, res, next) => {
        try {
            const result = await ProblemService.get(req.body.id);
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'POST /problem\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static submit = async (req, res, next) => {
        try {
            await ProblemService.submit({...req.body});
            return res.status(200).send(true);
        } catch (err) {
            err.message = 'POST /problem/submit\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static create = async (req, res, next) => {
        try {
            const problemNumber = await ProblemService.create({...req.body.problem});
            const result = await ProblemService.createTestcase({
                number : problemNumber,
                ...req.body.testcase
            });
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'POST /problem/create\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static getAll = async (req, res, next) => {
        try {
            const result = await ProblemService.getAll();
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'POST /problem/list\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static delete = async(req, res, next) => {
        try {
            const result = await ProblemService.delete(req.params.id);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'GET /problem/delete\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static update = async(req, res, next) => {
        try {
            await ProblemService.update(req);
            return res.status(200).json(req.params.id);
        } catch(err) {
            err.message = 'PATCH /problem/update\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static getTestcase = async(req, res, next) => {
        try {
            const result = await ProblemService.getTestcase(req.params.id);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'GET /problem/testcase\n -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static getTestcaseExample = async(req, res, next) => {
        try {
            const result = await ProblemService.getTestcaseExample(req.params.id);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'GET /problem/testcase/example\n -> ' +  err.message;
            err.status = 400;
            next(err);
        }
    }
    static updateTestcase = async(req, res, next) => {
        try {
            const deleteResult = await ProblemService.deleteTestcase(req.body.number);
            if(deleteResult){
                const result = await ProblemService.createTestcase({...req.body});
                return res.status(200).json(result);
            }
        } catch(err) {
            err.message = 'PUT /problem/testcase\n -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static deleteTestcase = async(req, res, next) => {
        try {
            const result = await ProblemService.deleteTestcase(req.params.id);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'DELETE /problem/testcase\n -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
}