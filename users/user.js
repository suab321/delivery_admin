const router=require('express').Router();
const axios=require('axios');

//importing from other folders///
const {decodeToken}=require('../jwt/jwt');
const {user_model}=require('../databse/db');
const {user_server}=require('../url')


const verify_token=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(token !== undefined){
        req.token=token.split(' ')[1];
        next();
    }
    else
        res.status(400).json({msg:"Token is required",response:"1"});
}

//route to get all users///
router.get('/get_users',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    console.log(user_id);
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${user_server}/services/get_users`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                console.log(err);
                res.status(400).json({msg:"Unable to fetch data",response:"1"});
            })
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"You are authenticated to use this route",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"You are not authorized to use this route",response:"3"});
})
//route ended///


//route to get unpaid orders///
router.get('/get_pending_orders',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
    user_model.findById({_id:user_id}).then(user=>{
        axios.get(`${user_server}/services/get_pending_orders`).then(res1=>{
            res.status(200).json(res1.data);
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"Unbale to fetch data",response:"1"});
        })
    }).catch(err=>{
        console.log(err);
        res.status(400).json({msg:'You are not authenticated user',response:"2"});
    })
  }
  else
    res.status(400).json({msg:"You are not authorize to use this route",response:"3"});
})
//route to get unpaid orders ended///


//route to get plced Orders//
router.get('/get_order_placed',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${user_server}/services/get_orders`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                console.log(err);
                res.status(400).json({msg:"Unable to fetch data",response:"1"});
            })
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"You are not valid use this route",response:"2"});
        })
    }
    else
        res.status(400).json({msg:"You are not authenticated user",response:"3"});
})
//route ended///

//route to get unverified users///
router.get('/get_unverified_users',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${user_server}/services/get_pending_users`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                console.log(err);
                res.status(400).json({msg:"Unable to fetch data",response:"1"});
            })
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"You are not a valid user",response:"2"})});
    }
    else
        res.status(400).json({msg:"You are not authenticated to use this route",response:"3"});
})
//route ended///

//route to get all transactions///
router.get('/transactions',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.get(`${user_server}/services/get_chargeId`).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                console.log(err);
                res.status(400).json({msg:"Error fetching details",response:"1"});
            })
        }).catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    }
    else
        res.status(400).json({msg:"You are not a valid user",response:"2"});
})
//route ended///

//route to get charge_detial///
router.post('/charge_detail',verify_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            axios.post(`${user_server}/payment/get_charge_detail`,{Charge_id:req.body.Charge_id}).then(res1=>{
                res.status(200).json(res1.data);
            }).catch(err=>{
                res.status(400).json({msg:"error fetching data",response:"1"});
            })
        }).catch(err=>{
            console.log(err)
            res.status(400).json({msg:"You are not a valid user",response:"1"});
        })
    }
    else
        res.status(400).json({msg:"You are not authenticated user",response:"2"});
})
//route ended//
module.exports={
    user_route:router
}