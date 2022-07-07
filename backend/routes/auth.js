const express=require('express');
const User = require('../models/Users');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET='Harryisagoodboy';

const fetchUser=require('../Middleware/fetchUser');
router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min :5}),
],async (req,res)=>{
    // Catching validation errors
    // console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    
    // console.log(req.body)
    try{
        // Trying to find if user exist from req.body
        let user= await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({
                message:"fail",
                description:"Sorry a user already exist"
            })
        }
        
        const salt= await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt)
        user=await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
        });
        
        const data={
            user:{
                id:user.id,
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        
        return res.status(201).json({
            message:"Success",
            data:{
                user
            },
            authToken  
        })
    }
    catch(error){
        return res.status(500).json({
            message:"fail",
            description:error.message
        })
    } 
});

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Please enter password').exists(),
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        });
    }
    
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(500).json({
                status:'fail',
                message:"Please enter valid credentials"
            })
        }

        const passwordCompare=bcrypt.compare(req.body.password,user.password);
        if(!passwordCompare){
            return res.status(500).json({
                status:'fail',
                message:"Please enter valid credentials"
            })
        }

        const data={
            user:{
                id:user.id,
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        
        return res.status(201).json({
            message:"Success",
            authToken  
        })

    }
    catch(err){
        return res.status(500).json({
            message:"fail",
            description:err.message
        })
    }
})

// Get logged in user details .login required

router.post('/getUser',fetchUser,async (req,res)=>{
    try{
        // console.log(req);
        userId=req.user.id;
        const user=await User.findById(userId).select('-password');
        res.status(200).json({
            status:'Sucess',
            data:{
                user
            }
        })
    }
    catch(err){
        res.status(500).json({err:'Internal Server Error'});
    }
})

module.exports=router;