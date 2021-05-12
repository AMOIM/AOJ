import {UserModel} from '../models/user.model.js';
import crypto from 'crypto';


export class UserService {
    static get = async (req) => {
        try {
            return UserModel.get(req.params.id);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }

    static update = async (req) => {
        try {
            const user = {
                ... req.body
            };
            const  cipher = crypto.createCipher('aes192', 'key');
            cipher.update(user.password, 'utf8', 'base64');
            const cipherPW = cipher.final('base64');

            const  cipher2 = crypto.createCipher('aes192', 'key');
            cipher2.update(user.changePW, 'utf8', 'base64');
            const cipherPW2 = cipher2.final('base64');

            return await UserModel.update(user.id, cipherPW, cipherPW2);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }

    static login = async (req) => {
        const user = {
            ...req.body.user
        };
        const  cipher =  crypto.createCipher('aes192', 'key');
        cipher.update(user.password,'utf8', 'base64');
        const cipherPw = cipher.final('base64');
        try {
            const result = await UserModel.login(user.id, cipherPw);
            if(result===false) return false;
            else return result;
        } catch(err) {
            throw new Error('Service -> + ' + err.message);
        }
    }
    
    static createToken = async(req, data) => {
        try {
            const user = {
                ...req.body.user
            };
            return await UserModel.createToken(user.id, data);
        } catch(err) {
            throw new Error('Service -> + ' + err.message);
        }
    }

    static signup = async(req) => {
        const user = {
            ...req.body.user
        };
        const  cipher = crypto.createCipher('aes192', 'key');
        cipher.update(user.password, 'utf8', 'base64');
        const cipherPW = cipher.final('base64');
        try {
            return await UserModel.signUp(user.id, user.name, cipherPW);
        } catch(err) {
            throw new Error('Service -> + ' + err.message);
        }
    }

    static delete = async(req) => {
        try {
            return await UserModel.delete(req.body.id);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }

    static deleteContestUser = async(req) => {
        try {
            return await UserModel.deleteContestUser(req.body.id);
        } catch(err) {
            throw new Error('Service -> ' + err.message);
        }
    }

    static getAll = async() => {
        try {
            return UserModel.getAll();
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }

    static approve = async(req) => {
        try {
            return UserModel.approve(req.body.id);
        } catch(err) {
            err.message = 'Service -> ' + err.message;
            throw err;
        }
    }
}

