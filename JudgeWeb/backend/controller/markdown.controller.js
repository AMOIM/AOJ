import MarkdownService from '../service/markdown.service.js';

export default class Markdown {
    static create = async (req, res, next) => {
        try {
            await MarkdownService.create({...req.body});
            return res.status(200).send(true);
        } catch(err) {
            err.message = 'POST /markdown/create\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    static get = async (req, res, next) => {
        try {
            const result = await MarkdownService.get();
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'GET /markdown/get\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
}