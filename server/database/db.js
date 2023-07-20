import mongoose from "mongoose";


const Connection=async(userName,Password)=>{
    

    const Url=`mongodb://omkarB:omkarB@ac-o08mejs-shard-00-00.oow4vgx.mongodb.net:27017,ac-o08mejs-shard-00-01.oow4vgx.mongodb.net:27017,ac-o08mejs-shard-00-02.oow4vgx.mongodb.net:27017/?ssl=true&replicaSet=atlas-ffqs38-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
    try{
        await mongoose.connect(Url,{useNewUrlParser:true});
        console.log("database connected successfully");

    } catch(error){
        console.log(error)
        
    }
}
        
export default Connection;