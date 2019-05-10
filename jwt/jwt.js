//importing node modules
const jwt=require('jsonwebtoken');

//importing from developer made folders//
const {user_model}=require('../databse/db');


function createToken(data){
    try{
        const token=jwt.sign({user:data},"suab");
        return token;
    }
    catch(err){
        return 0;
    }
}

function decodeToken(token){
    try{
        const authdata=jwt.verify(token,"suab");
        user_model.findById({_id:authdata.user}).then(user=>{
            if(user)
                return authdata;
            else
                return 0;
        }).catch(err=>{return 0})
    }
    catch(err){
        return 0;
    }
}


module.exports={
    createToken,
    decodeToken
}