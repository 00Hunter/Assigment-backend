const mongoose=require('mongoose');


const taskSchema=new mongoose.Schema({
    task:{
        type:String
    },
    
    _userId:{
        type:mongoose.Types.ObjectId
    },
    
})
const UserTask= mongoose.model('Usertodo',taskSchema)


exports.UserTask=UserTask;
exports.taskSchema=taskSchema;