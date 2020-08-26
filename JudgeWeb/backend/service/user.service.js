import { UserModel } from '../models/user.model.js';
import crypto from 'crypto';


export class UserService {
    static login = async (req) => {
        const user = {
            ...req.body.user
        };
        const  cipher =  crypto.createCipher('aes192', 'key');
        cipher.update(user.password,'utf8', 'base64');
        const cipherPw = cipher.final('base64');
        const result = await UserModel.login(user.id, cipherPw);
        if(result===false) return false;
        else return result;
    }
    
    static createtoken = async(req,name) => {
        const user = {
            ...req.body.user
        };
        const token = await UserModel.createtoken(user.id, name);
        return token;
    }

    static signup = async(req) => {
        const user = {
            ...req.body.user
        };

        const  cipher = crypto.createCipher('aes192', 'key');
        cipher.update(user.password, 'utf8', 'base64');
        const cipherPW = cipher.final('base64');

        const result = await UserModel.signup(user.id, user.name, cipherPW);
        if(result === 3) return 3;
        else if (result ===2) return 2;
        else return 1;
    }

    static checklogin = async(token) => {
        const result = await UserModel.checklogin(token);
        return result;
    }
}

