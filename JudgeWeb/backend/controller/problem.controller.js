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
            const result = await ProblemService.create({...req.body});
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
}