import mongoose from 'mongoose';
const { Schema,model } = mongoose;

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    min:4,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  token:{
    type:String,
    default:''
  }
});
const UserModel=model('bloger',userSchema);
export {UserModel};