const jwt=require("jsonwebtoken")

function auth(req,res,next){

    // console.log(req.header);
    const token =req.get('x-auth-token')
        // console.log("HELLLLOOOOOOO",req)
    if(!token) res.status(401).send("Acess Denied")

    try{
    const decoded=jwt.verify(token,"jwtPrivateKey")
    console.log("Value of decoded obejct is ",decoded._userId)
    req.user=decoded._userId;
    next();
    }
    catch(e){
        res.status(400).send('Invalid Token')
    }

}

module.exports=auth;