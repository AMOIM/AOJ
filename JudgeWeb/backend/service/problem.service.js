import axios from 'axios';

export default class ProblemService {
    static get = async (id) => {
        try {
            const result = await axios.post(
                process.env.JUDGE_SERVER + '/problem',
                {
                    id: id
                });
            return result.data;
        } catch (err) {
            throw new Error('Service -> Problem list axios error');
        }
    }
    static submit = async (data) => {
        try {
            await axios.post(
                process.env.JUDGE_SERVER + '/problem/submit',
                {
                    code: data.code,
                    lang: data.lang,
                    problemNum: data.problemNum,
                    userName: data.userName
                });
            axios.get(
                process.env.JUDGE_SERVER + '/judge'
            ).then(() => {
                return;
            }).catch(err => {
                throw err;
            });
        } catch (err) {
            throw new Error('Service -> Problem submit axios error');
        }
    }
}