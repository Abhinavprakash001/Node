  const mongoose=require('mongoose')
//Create Schema
 const userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        require:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    aadharCardNumber:{
        type:Number,
        requre:true,    
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
 });
 const user = mongoose.model('user',userSchema)
 module.exports=user;

 
 

