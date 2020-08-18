import { JudgeService } from '../service/judge.service.js';

export class JudgeController{
    static run = () => {
        JudgeService.run();
    }
}