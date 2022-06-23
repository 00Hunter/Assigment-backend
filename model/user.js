const mongoose=require('mongoose');
const Joi=require('joi')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },

});

userSchema.methods.genAuthToken=function(){
    console.log(this.name)
    const token=jwt.sign({_userId:this._id,name:this.name},"jwtPrivateKey")
    return token;
    // return;
}
const User=new mongoose.model('User',userSchema )

// add verifictaion of emailusng code

function validateUser(user){
    const schema=Joi.object({  
        name:Joi.string().max(15).min(5).required(),
        email:Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(15).required()
    })
  
    return schema.validate(user)
}
exports.validateUser=validateUser;
exports.User=User;