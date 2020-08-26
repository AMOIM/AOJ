import ScoreboardService from '../service/scoreboard.service.js';

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
}