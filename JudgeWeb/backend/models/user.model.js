import {ContestSchema, UserSchema} from './schema.model';
import jwt from 'jsonwebtoken';

export class UserModel {
    static get = async (data) => {
        try {
            const result = await UserSchema.findOne()
                .where({'id' : data});
            if(result !== null)
                result.password = 0;
            return result;
        } catch (err) {
            throw new Error('Model -> get error');
        }
    }

    static update = async (id, pw, changePW) => {
        try {
            const result = await UserSchema.updateOne(
                {
                    id : id,
                    password : pw
                },
                { $set : { password : changePW }}
            );
            return result.n;
        } catch (err) {
            throw new Error('Model -> update Error');
        }
    }

    static login = async(id, pw) => {
        try {
            const user = await UserSchema.findOne({id: id, password: pw});
            if(user === null) return false;
            else return user;
        } catch(err) {
            err.message = 'Model -> login err';
            throw err;
        }
    };

    static signUp = async(id, name, pw) => {
        const newUser = new UserSchema({
            id : id,
            name : name,
            password : pw,
            isApprove : false
        });
        try {
            const result = await UserSchema.findOne({id: id});
            const result2 = await UserSchema.findOne({name: name});
            if(result !== null)
                return 2;
            else if(result2 !== null) return 3;
            else {
                await newUser.save();
                return 1;
            }
        }catch(err) {
            err.message = 'Model -> signup err';
            throw err;
        }
    };

    static createToken = async(id, user) => {
        try {
            return jwt.sign({
                'id': id,
                'name': user.name
            }, process.env.SECRET_KEY, {
                expiresIn: '5h'
            });
        } catch(err) {
            err.message = 'Model -> createtoken err';
            throw err;
        }
    };

    static delete = async(id) => {
        try {
            const result = await UserSchema.remove()
                .where({'id': id});
            return result.n === 1;
        } catch(err) {
            throw new Error('Model -> delete err');
        }
    }

    static deleteContestUser = async(id) => {
        try {
            const contest = await ContestSchema.findOne()
                .where({'number' : id});

            if(contest === null) return false;
            for(let userID of contest.idList) {
                await UserSchema.remove()
                    .ne('name', 'admin')
                    .where({'id': userID});
            }
            return true;
        } catch(err) {
            throw new Error('Model -> deleteContest err');
        }
    }

    static getAll = async() => {
        try {
            const users = await UserSchema.find().ne('name', 'admin').select({id : 1, name : 1, isApprove : 1});
            return users;
        } catch (err) {
            throw new Error('Model -> getAll err');
        }
    }

    static approve = async(id) => {
        try {
            const result = await UserSchema.updateOne(
                {
                    id : id
                },
                {
                    $set : {
                        isApprove : true
                    }
                }
            );
            return result.n;
        } catch (err) {
            throw new Error('Model -> approve err');
        }
    }
}