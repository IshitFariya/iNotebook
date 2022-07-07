const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../Middleware/fetchUser");
const Note = require("../models/Note.js");

router.get('/getnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        notes
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
});

router.post("/createNotes",fetchUser, async (req, res) => {
  try {
    const {title,description,tag}=req.body;
    // console.log(title)
    const note= await Note.create({
        title,
        description,
        tag,
        user:req.user.id 
    })
    res.status(201).json({
        status:'Success',
        data:{
            note
        }
    })
  } 
  catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
});


router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
    try{
        // First verify that we are updating a note which is own by a particular user
        const currentnote=await Note.findById(req.params.id);
        // Note doesnot exist only
        if(!currentnote){
            res.status(401).json({err:'Note does not exist'})
        }
        
        const noteOwnedBy=currentnote.user.toString()
        if(req.user.id !== noteOwnedBy){
            res.status(401).json({err:'Not allowed'})
        }

        // Make the note you want to update it
        const noteUpdate={}
        if(req.body.title){
          noteUpdate.title=req.body.title
        }
        if(req.body.description){
          noteUpdate.description=req.body.description
        }
        if(req.body.tag){
          noteUpdate.tag=req.body.tag
        }        
        // Now update the note

        const note=await Note.findByIdAndUpdate(req.params.id,noteUpdate,{
            new:true,
            runValidators:true,
        }) 

        res.status(200).json({
            status:'Success',
            data:{
                note
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "Fail",
            message: err,
        });
    }
})

router.delete('/deleteNote/:id',fetchUser,async(req,res)=>{
    try{
        // First verify that we are updating a note which is own by a particular user
        const currentnote=await Note.findById(req.params.id);
        // Note doesnot exist only
        if(!currentnote){
            res.status(400).json({err:'Note does not exist'})
        }
        
        const noteOwnedBy=currentnote.user.toString()
        if(req.user.id !== noteOwnedBy){
            res.status(401).json({err:'Not allowed'})
        }
        // Now update the note
        const note=await Note.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status:'Success',
            data:note
        })
    }
    catch(err){
        res.status(404).json({
            status: "Fail",
            message: err,
        });
    }
})

module.exports=router;