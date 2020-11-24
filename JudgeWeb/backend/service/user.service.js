import { UserModel } from '../models/index.model.js';
import crypto from 'crypto';


export class UserService {
    static get = async (req) => {
        try {
            return UserModel.get(req);
        } catch(err) {
            err.message = 'Service -> getAll err';
            throw err;
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
            if (result ===2) return 2;
            else return 1;
        } catch(err) {
            err.message = 'Service -> signup err';
            throw err;
        }
    }
}

