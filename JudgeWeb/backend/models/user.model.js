import { UserSchema } from './schema.model.js';
import jwt from 'jsonwebtoken';

export class UserModel {
  static login = async(id, pw) => {
      const user = await UserSchema.findOne({id: id, password: pw});
      logger.info(user);
      logger.info(user===null);
      //if(err) return false;
      if(user === null) return false;
      else return user.name;
  };

  static signup = async(id, name, pw) => {
      try {
          const newUser = new UserSchema({
              id : id,
              name : name,
              password : pw    
          });
          const result = await UserSchema.findOne({id: id});
          if(result===null) {
              await newUser.save();
              return 1; 
          }
          else return 2;
      }catch(err) {
          return 3;    
      }
  };

  static createtoken = async(id,name) => {
      const token = jwt.sign({
          id, name
      }, process.env.SECRET_KEY, {
          expiresIn: '5h'
      });
      return token;
  }
}
