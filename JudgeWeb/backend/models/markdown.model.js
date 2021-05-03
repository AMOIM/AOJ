import fs from 'fs';

export class MarkdownModel {
    static create = (data) => {
        try {
            const input = data.markdownText;
            const title = data.markdownTitle;
            fs.writeFileSync('../frontend/public/markdown/' + title + '.md', input, 'utf8');
        } catch(err) {
            err.message = 'Model -> create markdown err';
            throw err;
        }
    }
    static get = () => {
        try {
            const homeMarkdown = fs.readFileSync('../frontend/public/markdown/home.md', 'utf8');
            const judgeMarkdown = fs.readFileSync('../frontend/public/markdown/judge.md', 'utf8');
            return {'homeMarkdown' : homeMarkdown, 'judgeMarkdown' : judgeMarkdown};
        } catch(err) {
            err.message = 'Model -> get markdown err';
            throw err;
        }
    }
}