const express=require('express');
const router=express.Router();
const person=require('../person');

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error '});
    }
})
router.get('/',async(req,res)=>{
  try{
    const data = await person.find();
    console.log('data fatched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
    console.log("WORK RECEIVED",workType);
    if(workType=='chef'||workType=='manager'||workType=='waiter')
    {
      const response=await person.find({work:workType});
      console.log('response fetched')
      res.status(200).json(response);
    }  
     } catch(err){
      console.log(err)
       res.status(500).json({error:'invailed work type'});
    }
});
module.exports=router;

router.put('/:id',async(req,res)=>{
       try{
        const personId=req.params.id;
        const updatedpersonData=req.body;
        const response=await person.findByIdAndUpdate(personId,updatedpersonData,{
          new:true,
          runValidature:true,
        });
        if(!response){
          return res.status(404).json({erro:'person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);
       }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
       }
})

router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;
    const response=await person.findByIdAndDelete(personId);
  
  console.log('data delete');
  res.status(200).json({message:'person Deleted succesfully'})
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Interval server error'});
  }
})