import ScoreboardService from '../service/scoreboard.service.js';
import StatusService from '../service/status.service';

export default class Contest {
    static getScoreboard = async (req, res, next) => {
        try {
            const number = req.params.id;
            const result = await ScoreboardService.get(number);
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'Get /contest/scoreboard\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static getStatus = async (req, res, next) => {
        try {
            const number = req.params.id;
            const user = req.body.user;
            const result = await StatusService.get(number, user);
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'POST /contest/status\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
}