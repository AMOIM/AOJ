import { MarkdownModel } from '../models/markdown.model.js';

export default class MarkdownService {
    static create = async (data) => {
        try {
            await MarkdownModel.create(data);
        } catch(err) {
            throw new Error('Service -> markdown create -> ' + err.message);
        }
    }
    static get = async () => {
        try {
            return await MarkdownModel.get();
        } catch(err) {
            throw new Error('Service -> markdown get -> ' + err.message);
        }
    }
}