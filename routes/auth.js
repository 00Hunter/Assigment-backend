const express=require('express')
const bcyrpt=require('bcrypt')
const {User}=require('../model/user')
const route=express.Router();
const joi=require('joi');



route.post('/',async(req,res)=>{
        console.log(req.body)

        const {error} =validateReq(req.body)
        // console.log(error)
        if(error){
            return res.status(400).send(error.details[0])
        }

        let user=await User.findOne({email:req.body.email})
            console.log(user)
        if(!user){
            return res.status(400).send("Invalid id or password")
        }

        let validatePassword=await bcyrpt.compare(req.body.password,user.password)
        
        if(!validatePassword){
            res.status(400).send("Invalid id or password")
        } else {
            const token=user.genAuthToken();
            res.status(200).send(token);
        }

        // add access based token
       
        
        
        //Using becrypt to compare password 


})

function validateReq(req){
    const schemaUser=joi.object({
        email:joi.string().min(4).max(100).required(),
        password:joi.string().min(4).max(100).required()
    })

    return schemaUser.validate(req);
}

module.exports=route