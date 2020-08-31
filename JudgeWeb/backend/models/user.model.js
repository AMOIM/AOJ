import { UserSchema } from './schema.model.js';
import jwt from 'jsonwebtoken';

export class UserModel {
  static login = async(id, pw) => {
      try {
          const user = await UserSchema.findOne({id: id, password: pw});
          if(user === null) return false;
          else return user.name;
      } catch(err) {
          err.message = 'Model -> login err';
          throw err;
      }
  };

  static signup = async(id, name, pw) => {
      const newUser = new UserSchema({
          id : id,
          name : name,
          password : pw    
      });
      try {
          const result = await UserSchema.findOne({id: id});
          if(result===null) {
              await newUser.save();
              return 1; 
          }
          else return 2;
      }catch(err) {
          err.message = 'Model -> signup err';
          throw err;  
      }
  };

  static createtoken = async(id,name) => {
      try {
          const token = jwt.sign({
              id, name
          }, process.env.SECRET_KEY, {
              expiresIn: '5h'
          });
          return token;
      } catch(err) {
          err.message = 'Model -> createtoken err';
          throw err;
      }
  }
}
