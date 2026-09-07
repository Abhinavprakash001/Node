  const mongoose=require('mongoose')
//Create Schema
 const candidateSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    party:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
     votes:[{
              user: {
              type:mongoose.Schema.Types.ObjectId,
              ref:'user',
              required:true
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
        ],
        voteCount:{
            type:Number,
            default:0
        }
    
    
 });
 
 const candidate = mongoose.model('candidate',candidateSchema)
 module.exports=candidate;

 
 

