const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/assignment");
const User=require("../modules/user");
const express=require("express");
const router=express.Router();

router.get("/",async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            status:"Success",
            users
        })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            message:e.message
        })
    }
})

router.post("/",async (req,res)=>{
    try{
        const users=await User.create(req.body);
        res.status(200).json({
            status:"Success",
            users
        })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            message:e.message
        })
    }
})

router.put("/:id",async (req,res)=>{
    try{
        const users=await User.updateOne(
                {_id:req.params.id},
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
            );

        res.status(200).json({
            status:"Success",
            users
        })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            message:e.message
        })
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const users=await User.deleteOne(
                {_id:req.params.id},
            );

        res.status(200).json({
            status:"Success",
            users
        })
    }
    catch(e){
        res.status(500).json({
            status:"failure",
            message:e.message
        })
    }
})

module.exports=router;