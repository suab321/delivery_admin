const mongoose=require('mongoose');

//importing from other folders
const mongourl=require('../url').database_url;

mongoose.connect(mongourl,{useNewUrlParser:true,useCreateIndex:true},(err,connection)=>{
    if(err)
        console.log(err);
    else
        console.log("database connected");
})

const user=new mongoose.Schema({
    Email:{type:String,unique:true},
    Password:{type:String}
})
const payment=new mongoose.Schema({
    Payment_To_stripeId:String,
    Payment_To_dbId:String,
    Amount:String,
    From_StripeId:String,
    From_dbId:String
})

const controls=new mongoose.Schema({
    Refund_fine:{type:Number,default:90},
})

const user_model=mongoose.model("user",user);
const payment_model=mongoose.model("payment",payment);
const control_model=mongoose.model("Controls",controls);

module.exports={
    user_model,
    payment_model,
    control_model
}