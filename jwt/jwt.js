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

function decodeToken(token){
    try{
        const authdata=jwt.verify(token,"suab");
        return authdata;
    }
    catch(err){
        return 0;
    }
}


module.exports={
    createToken,
    decodeToken
}