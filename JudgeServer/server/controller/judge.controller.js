import JudgeService from '../service/judge.service.js';

export default class Judge {
    static run = async (req, res, next) => {
        try {
            await JudgeService.run();
            res.status(200).send(true);
        } catch (err) {
            err.message = 'Run Judge -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
}