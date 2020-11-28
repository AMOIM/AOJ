import { UserModel } from '../models/index.model.js';
import crypto from 'crypto';


export class UserService {
    static get = async (req) => {
        try {
            return UserModel.get(req);
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
            err.message = 'Service -> login err';
            throw err;
        }
    }
    
    static createtoken = async(req,name) => {
        try {
            const user = {
                ...req.body.user
            };
            const token = await UserModel.createtoken(user.id, name);
            return token;
        } catch(err) {
            err.message = 'Service -> createtoken err';
            throw err;
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
            const result = await UserModel.signup(user.id, user.name, cipherPW);
            return result;
        } catch(err) {
            err.message = 'Service -> signup err';
            throw err;
        }
    }
}

