const express=require('express');
const auth = require('../middleware/auth');
const { UserTask } = require('../model/Todo');
const route=express.Router();



//Get all Locations UserId 
route.get('/',auth,async(req,res)=>{
    
    try{
    const details=await UserTask.find({_userId:req.user});
    console.log(details)
    res.send(details)

    }catch(e){
        res.status(400).send("Please Save a Location")
    }
})


//Post new Locations using userID

route.post('/',auth,async(req,res)=>{
 
    
    const newtask= UserTask({
        _userId:req.user,
        task:req.body.task,
    })  
    console.log(newtask)

    await newtask.save();
    res.send(newtask)
    
})
//Delete a Location
route.put('/:id',async(req,res)=>{

    //validate request
    const result=await UserTask.findById(req.params.id);
    result.remove();
    res.send("Done");   
})

module.exports=route