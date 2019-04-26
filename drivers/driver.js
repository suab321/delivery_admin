//importing nodemodules//
const router=require('express').Router();
const axios=require('axios');
//ended///

//importing modules from other folders//
const {user_model}=require('../databse/db');
const {createToken,decodeToken}=require('../jwt/jwt');
const {driver}=require('../url')
//ended///

const get_token=(req,res,next)=>{
    const header=req.headers['authorization'];
    if(header !== undefined){
        const token=header.split(' ')[1];
        if(token){
            req.token=token;
            next();
        }
        else{
            res.status(400).json({msg:"Token required",response:"0"});
        }
    }
    else
        res.status(400).json({msg:"Token is required",response:"1"})
}

//route to get unverified users///
router.get('/get_unverified_user',get_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${driver}/services/get_pending_drivers`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                res.status(400).json({msg:"unable to fetch data",response:"1"});
            })
        }).catch(err=>{
            res.status(400).json({msg:"you are not a valid user",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"You are not authenticated user",response:"3"});
})
//route ended///

//route to get all drivers//
router.get('/get_drivers',get_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${driver}/authentication/get_drivers)`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                res.status(400).json({msg:"Error in from driver side",response:"1"});
            })
        }).catch(err=>{
            res.status(400).json({msg:"You are not allowed for this",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"you are not authorised",response:"2"});
})
//route ended///

//route to get unatteneded orders///
router.get('/get_pending_orders',get_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${driver}/services/pending_order)`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                res.status(400).json({msg:"Error in from driver side",response:"1"});
            })
        }).catch(err=>{
            res.status(400).json({msg:"You are not allowed for this",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"you are not authorised",response:"2"});
})
//route ended///

//route to get all orders
router.get('/get_orders',get_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${driver}/services/order)`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                res.status(400).json({msg:"Error in from driver side",response:"1"});
            })
        }).catch(err=>{
            res.status(400).json({msg:"You are not allowed for this",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"you are not authorised",response:"2"});
})
//route ended///

module.exports={
    driver_route:router
}