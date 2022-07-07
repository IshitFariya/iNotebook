const mongoose=require('mongoose')

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:[true,'Please enter title']
    },
    description:{
        type:String,
        requied:[true,'Please enter description']
    },
    tag:{
        type:String,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Notes= mongoose.model('Notes',notesSchema);
module.exports=Notes