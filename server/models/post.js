import mongoose from "mongoose";


const {Schema,model}=mongoose;

const PostSchema=new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    auther:{type:Schema.Types.ObjectId,ref:'bloger'},
    comments:[String],
},{
    timestamps:true,
});

const PostModel=model('Post',PostSchema);

export {PostModel};