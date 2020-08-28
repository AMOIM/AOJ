import IndexService from '../service/index.service.js';

export default class Judge {
    static run = async () => {
        try {
            await IndexService.run();
        } catch (err) {
            err.message = 'Run Judge -> ' + err.message;
            logger.error(err.message);
        }
    }
}