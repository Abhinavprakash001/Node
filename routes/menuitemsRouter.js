const express=require('express');
const router=express.Router();
const menu=require('../menu');

router.get('/',async(req,res)=>{
  try{
    const data = await menu.find();
    console.log('data fatched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.post('/',async(req,res)=>{
  try{
    
    const data=req.body;
    
    console.log("DATA RECEIVED:", data);
    const newmenu = new menu(data);

    const response= await newmenu.save();
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'InternaL server error'});
  }
})
router.get('/:taste',async(req,res)=>{
  try{
    const taste=req.params.taste;
    console.log("TASTE RECEIVED",taste);
    if(taste=='sweet'||taste=='sour'||taste=='salty'||taste=='spicy')
    {
      const response=await menu.find({taste:taste});
      console.log('response fetched1')
      res.status(200).json(response);
    }  
     } catch(err){
      console.log(err)
       res.status(500).json({error:'invailed work type'});
    }
});
module.exports=router;
