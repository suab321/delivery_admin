//importing node modules
const router=require('express').Router();
const axios=require('axios');
//ends//

//importing from developer made folders//
const {user_model,payment_model}=require('../databse/db')
const {driver}=require('../url')
//ends//

const get_token=(req,res,next)=>{
    const header=req.headers["authorization"];
    if(header !== undefined)
        res.status(400).json({code:"2",msg:"Token is required"})
    else{
        const token=header.split(' ')[1];
        req.token=token;
        next();
    }
}

router.post('/pay_to_driver',get_token,(req,res)=>{
    axios.get(`${driver}/services/get_order`,{headers:{authorization: `Bearer ${req.token}`}},{Order_id:req.body.Order_id}).then(res1=>{
        const data=res1.data;
        console.log(data);
        if(!data.isPaid){
            console.log("driver is unpaid");
            res.status(200).json("driver is unpaid");
        }
        else{
            console.log("driver is paid");
            res.status(400).json("driver is paid");
        }
    }).catch(err=>{
        console.log(err);
        res.status(400).json("error fetching response");
    })
})

module.exports={
    pay_route:router
}