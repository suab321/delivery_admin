const jwt=require('jsonwebtoken');


function createToken(data){
    try{
        const token=jwt.sign({user:data},"suab");
        return token;
    }
    catch(err){
        return 0;
    }
}

function decodeToken(data){
    try{
        const user=jwt.verify(data,"suab");
        return user;
    }
    catch(err){
        return 0;
    }
}


module.exports={
    createToken,
    decodeToken
}