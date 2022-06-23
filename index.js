const express=require('express');
const app=express();
const mongoose=require('mongoose')
const auth=require('./routes/auth')
const Todo=require('./routes/storeTask');
const user=require('./routes/user');


mongoose.connect('mongodb://localhost/assignment')
    .then(()=>{console.log("Connected to mongodb")})
    .catch(()=>{console.log("Cannot connect to mongodb")})



app.use(express.json());
app.use('/api/store',Todo);
app.use('/api/auth',auth);
app.use('/api/user',user);









const port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`Listining to port${port}`)})



