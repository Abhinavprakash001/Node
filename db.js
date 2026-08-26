const mongoose=require('mongoose')
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL);

const db=mongoose.connection;
db.on('connected',() =>{
         console.log("connnected to mongose server")
})
db.on('error',(err)=>{
       console.log('mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log("connected to mongose server ")
})
module.exports=db;