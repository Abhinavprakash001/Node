 const mongoose=require('mongoose')
//Create Schema
 const personSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:String,
        required:true
    }

 });
 const person = mongoose.model('person',personSchema)
 module.exports=person;

 //create person model
 

