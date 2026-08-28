const mongoose=require('mongoose')
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

//const mongoURL = 'mongodb+srv://abhinavprakash0511_db_user:Abhinav7762@cluster0.1ej0mx1.mongodb.net/hotels';
//const mongoURL='process.env.MONGODB_URL_LOCAL'
const mongoURL='process.env.MONGODB_URL'
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