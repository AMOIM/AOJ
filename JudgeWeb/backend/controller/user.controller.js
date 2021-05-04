import { UserService } from '../service/user.service.js';

export class UserController {
    static get = async (req, res, next) => {
        try {
            if(req.decoded.id !== req.body.id && req.decoded.name !== 'admin') {
                return res.status(200).json({ result : null });
            }

            const result = await UserService.get(req);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'POST /user\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static update = async (req, res, next) => {
        try {
            const result = await UserService.update(req);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'POST /user/update\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static login = async (req, res, next) => {
        try {
            const result = await UserService.login(req);
            if(result === false) {
                return res.status(200).json({token : 0});
            }
            else if(result.isApprove === false){
                return res.status(200).json({token : 1});
            }
            else {
                try {
                    const token = await UserService.createToken(req,result);
                    return res.status(200).json({token : token});
                } catch(err) {
                    err.message = 'Controller -> login(token) err';
                    err.status = 400;
                    throw err;
                }
            }
        } catch(err) {
            err.message = 'POST /user/login\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
    
    static signUp = async (req, res, next) => {
        try {
            const result = await UserService.signup(req);
            return res.status(200).json({result : result});
        } catch(err) {
            err.message = 'POST /user/signup\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const result = await UserService.delete(req);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'POST /user/delete\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static deleteContestUser = async (req, res, next) => {
        try {
            const result = await UserService.deleteContestUser(req);
            return res.status(200).json(result);
        } catch(err) {
            err.message = 'POST /user/delete\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static getAll = async(req, res, next) => {
        try {
            const result = await UserService.getAll();
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'GET /user/check\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }

    static approve = async(req, res, next) => {
        try {
            const result = await UserService.approve(req);
            return res.status(200).json(result);
        } catch (err) {
            err.message = 'PATCH /user/approve\nController -> ' + err.message;
            err.status = 400;
            next(err);
        }
    }
} 