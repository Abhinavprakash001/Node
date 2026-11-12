  const mongoose=require('mongoose')
  const bcrypt=require('bcrypt');
//Create Schema
 const userSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
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
        required:true,    
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
    type:String,
    enum:['voter','candidate','admin'],
    default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
 });

 // Password hashing
userSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});
// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

 const user = mongoose.model('user',userSchema)
 module.exports=user;

 
 

