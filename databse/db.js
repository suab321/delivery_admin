const mongoose=require('mongoose');

//importing from other folders
const mongourl=require('../url').database_url;

mongoose.connect(mongourl,{useNewUrlParser:true},(err,connection)=>{
    if(err)
        console.log(err);
    else
        console.log("database connected");
})

const user=new mongoose.Schema({
    Email:String,
    Password:String
})

const user_model=mongoose.model("user",user);

module.exports={
    user_model
}