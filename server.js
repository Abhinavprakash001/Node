//console.log("server file is runnimg");
//function add(a,b){
  //  return a+b;
//}
//var add=(a,b) => {return a+b;}
// var add=(a,b) => (a+b);

// var result = add(2,4)
// console.log(result);

// ( function(){
//         console.log("Abhianv")
//     }
// )();

// function callback(){
//     console.log("callback function is called")
// }
// const add=function(a,b,callback){
//     var result=a+b;
//     console.log('result:'+result);
//     callback();
// }
// add(3,4,callback)

// const add=function(a,b,abhinav){
//     result=a+b;
//     console.log(result)
//     abhinav();
// }
// add(3,5,function(){
//     console.log("Add completed")
// })
// add(3,5, () =>{
//     console.log("addtion")
// })
 
// const console = require('console');
// var fs=require('fs')
// var os=require('os')

// var user=os.userInfo();
// console.log(user);
// console.log(user.username)

// fs.appendFile('greeting.txt','Hi' + user.username +'!/n', ()=>{
//     console.log('file is created ');
// });
// console.log(fs)
// console.log(os)

// const notes=require('./notes.js')
 
// const _ =require('lodash')

// console.log("server is available here ")
// var age=notes.age;

// const result=notes.addNumber(age+18,10)
 
// console.log(age)
// console.log('result:'+result)

// var data =["number",1,2,1,1,3,1,'age','names']
// var filter=_.uniq(data);
// console.log(filter);
// console.log(_.isString("Abhinav"))

// const jsonString='{"name":"Abhinav","age":26,"city":"india"}'
// const jsonObject=JSON.parse(jsonString)
// console.log(jsonObject.name)


// const objectToConvert={name:"Alice","age":25}
// const jsonStringfield=JSON.stringify(objectToConvert);
// console.log(jsonStringfield)
// const express = require('express');
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/lichi',(req,res) => {
//   res.send('hello lichi is here ')
// })

// app.get('/idli',(req,res) => {
//   res.send('hello wellcome to south indian food')
// })

// app.get('/idlii',(req,res) =>{
//   var customizedidli = {
//     name :'rava-idli',
//     size : '10com diameter',
//     issambhar : 'true',
//     itschutney :'false',
//   }
//   res.send(customizedidli)
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/idliDB')
// mo

//     .then(() => console.log('MongoDB connected'))
//     .catch((error) => console.log('MongoDB error:', error));

const express=require('express')
const app=express();

const db=require('./db');
require('dotenv').config();



const PORT=process.env.PORT|| 3000;

app.use(express.json());


const menuitemsRouter=require('./routes/menuitemsRouter')

const personRoutes=require('./routes/personRoutes');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const logRequest=(req,res,next)=>{
  console.log('[${new Date().toLocalString()}] Request made to:{req.originalUrl}');
  next();
}

const menu= require('./menu');

app.use(logRequest);

app.get('/',function(req,res){
  res.send('welcome to my hotel')
})

app.get('/chicken',function(req,res){
  res.send('welcome to my hotel, I want to serve you chicken')
})



app.use('/menu',menuitemsRouter);

app.use('/person',personRoutes);

app.listen(PORT,()=>{
  console.log('listening on post 3000');
});