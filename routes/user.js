const express=require('express')
const route=express.Router();
const bcrypt=require('bcrypt');
const {User,validateUser}=require('../model/user')
const jwt=require('jsonwebtoken')



route.post('/',async(req,res)=>{
    //check req body
    const {error}=validateUser(req.body);
    if(error){
        return res.status(400).send(error)
    }

    //check if user exist 
    let user= await User.findOne({email:req.body.email})

    if(user){
        return res.status(404).send("User Already Exist")
    }else{
        const salt =await bcrypt.genSalt(10);
        
        user=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        user.password=await bcrypt.hash(user.password,salt);
        await user.save()


        //using JWT Tokens
        const token=user.genAuthToken();
        console.log(token)
        res.header('x-auth-token',token).send();
    }

    //if not then create a new user
    
})

module.exports=route