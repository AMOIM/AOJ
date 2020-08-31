import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type : String,
    unique : true
  },
  id: {
    type : String,
    unique : true
  },
  password: String
});

const UserSchema = new mongoose.model('user', userSchema);

export {
    UserSchema
}; 
