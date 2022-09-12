const express=require("express");
const app=express();
const PORT=3000;
const userRoutes=require("./routes/user");
const loginRoutes=require("./routes/login");
const postRoutes=require("./routes/posts");
const User=require("./modules/user");
var jwt=require("jsonwebtoken");
const secret="GID_RESTAPI";
// const bodyparser=require("body-parser");
//app.use(bodyparser.json());
app.use(express.json());
app.use("/users",userRoutes);
app.use("/",loginRoutes);

app.use("/posts",(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split("test ")[1];
        jwt.verify(token,secret,async function(err,decoded){
            if(err){
                res.status(500).json({
                    status:"failure",
                    message:"Not authorized"
                })
            }
            const user=await User.findOne({_id:decoded.data});
            req.user=user._id;
            next();
        })
    }
    else{
        return res.status(500).json({
            status:"failure",
            message:"Invalid token"
        })
    }
})

app.use("/posts",postRoutes)

app.listen(PORT,()=>{
    console.log("server is running")
})