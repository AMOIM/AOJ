import JudgeService from '../service/judge.service.js';

export default class Judge {
    static run = async () => {
        try {
            await JudgeService.run();
        } catch (err) {
            err.message = 'Run Judge -> ' + err.message;
            logger.error(err.message);
        }
    }
}