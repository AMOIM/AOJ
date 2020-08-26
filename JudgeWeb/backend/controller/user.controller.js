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

    static checklogin = async(req, res) => {
        if(req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ');
            logger.info(token[0]);
            logger.info(token[1]);
            if(token[0] === 'Bearer') {
                try {
                    const decoded = await UserService.checklogin(token[1]);
                    if(decoded) {
                        logger.info(JSON.stringify(decoded));
                        return;
                    }
                    else {
                        return res.status(401).json({result : '로그인 후 이용가능합니다.'});
                    }
                } catch(error) {
                    return res.status(401).json({result : '로그인 후 이용가능합니다.'});
                }
            }
        }
        return res.status(401).json({result : '로그인 후 이용가능합니다.'});
    }
} 