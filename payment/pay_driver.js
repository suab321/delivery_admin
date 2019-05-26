
//key for stripe account//
const secretKey="sk_test_Wae1JVypvlaoK5pLIFPsrexC0060Ik7P4F";
const publicKey="pk_test_mNSmGjYqswUKp1NnrGGuNk8f004q3h4DWh";
//ends//


//importing node modules
const router=require('express').Router();
const axios=require('axios');
const stripe=require('stripe')(secretKey)
//ends//

//importing from developer made folders//
const {user_model,payment_model}=require('../databse/db')
const {driver}=require('../url')
//ends//

const get_token=(req,res,next)=>{
    const header=req.headers.authorization;
    console.log(header)
    if(header === undefined){
        console.log("token is failing");
        res.status(400).json({code:"2",msg:"Token is required"})
    }
    else{
        const token=header.split(' ')[1];
        req.token=token;
        next();
    }
}

router.post('/pay_to_driver',get_token,(req,res)=>{
    axios.post(`${driver}/services/get_order`,{Order_id:req.body.Order_id},{headers:{Authorization: `Bearer ${req.token}`}}).then(res1=>{
        const data=res1.data;
        console.log("35js "+data);
        if(!data.isPaid){
            console.log("driver is unpaid");
            stripe.transfers.create({
                amount:data.Earning,
                currency:"usd",
                destination:req.body.Account_Id
            }).then(transfer=>{
                console.log(transfer);
            }).catch(err=>{
                console.log(err);
            })
            
        }
        else{
            console.log("driver is paid");
            res.status(400).json("driver is paid");
        }
    }).catch(err=>{
        console.log("err coming when fetching order id from driver");
        res.status(400).json("error fetching response");
    })
})

module.exports={
    pay_route:router
}