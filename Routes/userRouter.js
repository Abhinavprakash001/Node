const express=require('express');
const router=express.Router();
const user=require('../model/user');
const {jwtAuthmiddleware,generateToken}=require("../jwt.js");


router.post('/signup',async(req,res)=>{
    try{
        const {aadharCardNumber,password}=req.body;
        const newUser=await user.findOne({aadharCardNumber: aadharCardNumber});
        if(!user|| !(await user.comparePassword(password))){
          return res.status(401).json({error:'Invalid username or password'})
        }
        const payload={
          id:user.id,
          username:user.username
        }
        const token=generateToken(payload);
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error '});
    }
});

router.get('/profile',jwtAuthmiddleware,async(req,res)=>{
  try{
    const userData = req.user;
    const userId= userData.Id;
    const user=await user.findById(userId);
    res.status(200).json({userId});
  }catch(err){
    console.error(err);
    res.status(500).json({error:'internal server error'});
  }
})


router.put('/profile/password',jwtAuthmiddleware,async(req,res)=>{
       try{
        const userId=req.user;
        const {currentPassword,newPassword}=req.body
        
        //find user by id
        const user= await user.findById(userId);
        
        //If password does not match return error
         if(!(await user.comparePassword(currentPassword))){
          return res.status(401).json({error:'Invalid username or password'})
        }


        user.password=newPassword;
        await user.save();

        
        console.log('password updated');
        res.status(200).json({message:"password update"});
       }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
       }
})



router.delete('/:id',async(req,res)=>{
  try{
    const userId=req.params.id;
    const response=await user.findByIdAndDelete(userId);
  
  console.log('data delete');
  res.status(200).json({message:'person Deleted succesfully'})
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Interval server error'});
  }
})
module.exports=router;