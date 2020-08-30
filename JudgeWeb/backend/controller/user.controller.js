import { UserService } from '../service/user.service.js';

export class UserController {
    static login = async (req, res) => {
        const result = await UserService.login(req);
        if(result === false) {
            logger.info(result);
            return res.status(200).json({token : 0});
        }
        else {
            const token = await UserService.createtoken(req,result);
            logger.info(result);
            logger.info(token);
            return res.status(200).json({token : token});
        }
    }
    
    static signup = async (req, res) => {
        const result = await UserService.signup(req);
        if(result === 3) return res.status(400).json({result : 3});
        else if(result === 2) return res.status(200).json({result : 2});
        else return res.status(200).json({result : 1});
    }
} 