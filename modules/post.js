const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PostSchema=new Schema({
    title:{type:String, required: true},
    body:{type:String, required:true},
    image:{type:String},
    user:{type:Schema.Types.ObjectId,ref:"User"}
})

const Post=mongoose.model("Post",PostSchema);
module.exports=Post;