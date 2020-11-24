import { UserService } from '../service/user.service.js';

export class UserController {
    static get = async (req, res, next) => {
        try {
            const result = await UserService.get(req);
            return res.status(200).json({ user : result});
        } catch(err) {
            err.message = 'Controller -> getAll err';
            next(err);
        }
    }

    static login = async (req, res, next) => {
        try {
            const result = await UserService.login(req);
            if(result === false) {
                logger.info(result);
                return res.status(200).json({token : 0});
            }
            else {
                try {
                    const token = await UserService.createtoken(req,result);
                    logger.info(result);
                    logger.info(token);
                    return res.status(200).json({token : token});
                } catch(err) {
                    err.message = 'Controller -> login(token) err';
                    next(err);
                }
            }
        } catch(err) {
            err.message = 'Controller -> login err';
            next(err);
        }
    }
    
    static signup = async (req, res, next) => {
        try {
            const result = await UserService.signup(req);
            if(result === 2) return res.status(200).json({result : 2});
            else return res.status(200).json({result : 1});
        } catch(err) {
            err.message = 'Controller -> signup err';
            next(err);
        }
    }
} 