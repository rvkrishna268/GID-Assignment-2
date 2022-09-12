const bcrypt=require("bcrypt");
const { body,validationResult } = require("express-validator");
const User = require("../modules/user");
const router = require("./user");
var jwt=require("jsonwebtoken");
const secret="GID_RESTAPI";

router.post("/register",body("email").isEmail(),async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {name,email,password}=req.body;
        bcrypt.hash(password,10,async function(err,hash){
            if(err){
                res.status(404).json({
                    status:"failed",
                    message:"err message"
                })
            }
            const user=await User.create({
                name,
                email,
                password:hash
            })
            res.json({
                status:"Success",
                message:"Successful registration",
                user
            })
        })
    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:e.message
        })
    }
})

router.post("/login",body("email").isEmail(),async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        const {email,password}=req.body;
        const data=await User.findOne({email});
            if(!data){
                res.status(400).json({
                    status:"Failure",
                    message:"User not registered, please register"
                })
            }
        bcrypt.compare(password,data.password,function (err,result){
            if(err){
                res.status(500).json({
                    status:"Failure",
                    message:"User not registered, please register"
                })
            }
            if(result){
                const token=jwt.sign({
                    exp:Math.floor(Date.now()/1000)+(60*60),
                    data:data._id
                },secret);
                res.json({
                    status:"Success",
                    message:"Login Successful",
                    token
                })
            }
            
        })
        
    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:e.message
        })
    }
})

module.exports=router;