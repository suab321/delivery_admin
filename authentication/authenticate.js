const router=require('express').Router();

//importing modules from other folder
const {user_model}=require('../databse/db');
const {createToken,decodeToken}=require('../jwt/jwt');

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
        res.status(400).json({msg:"Token is required",response:"1"});

}

//route to add new member//
router.post('/add_new_user',get_token,(req,res)=>{
    const user_id=decodeToken(req.token).user;
    if(user_id){
        user_model.findById({_id:user_id}).then(user=>{
            const db=new user_model;
            db.Email=req.body.Email;
            db.Password=req.body.Password;
            db.save().then(user=>{
                res.status(200).json({msg:"User is added",response:"1"});
            }).catch(err=>{
                res.status(400).json({msg:"Failed to add User",response:"2"});
            })
        }).catch(err=>{
            res.status(400).json({msg:"You are not authenticted to use this route",response:"3"});
        })
    }
    else
        res.status(400).json({msg:"You are not valid user",response:"4"});
})

//login route//
router.post('/login',(req,res)=>{
    user_model.find({Email:req.body.Email,Password:req.body.Password}).then(user=>{
        const token=createToken(user[0]._id);
        if(token)
            res.status(200).json({token});
        else
            res.status(400).json({msg:"err generating token",respoonse:"0"});
    }).catch(err=>{
        res.status(400).json({msg:"Wrong credentials",response:"1"});
    })
})
//login route ended//

//for ist time users//
// router.post('/new_user',(req,res)=>{
//     const db=new user_model;
//     db.Email=req.body.Email;
//     db.Password=req.body.Password;
//     db.save().then(user=>{
//         res.status(200).json({response:"added successfully",response:"1"});
//     }).catch(err=>{
//         console.log(err);
//         res.status(400).json({response:"Error",reponse:"0"});
//     })
// })
//ended///

module.exports={
    auth_route:router
}

