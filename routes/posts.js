const Post = require("../modules/post");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        //console.log(posts);
        res.status(200).json({
            status: "Success",
            user:req.user,
            posts
        })
    }
    catch (e) {
        res.status(500).send({
            status: "Failure",
            message: e.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const posts = await Post.create(req.body)
        res.status(200).json({
            status: "Success",
            message: "POST CREATED",
            user:req.user,
            posts
        })
    }
    catch (e) {
        res.status(500).send({
            status: "Failure",
            message: e.message
        })
    }
})


router.put("/:id", async (req, res) => {
    try {
        const posts = await Post.updateOne(
            { _id: req.params.id },
            {
                title: req.body.title,
                body: req.body.body,
                image: req.body.image,
                user: req.user
            }
        )
        res.status(200).json({
            status: "Successfully updated post",
            posts
        })
    }
    catch (e) {
        res.status(500).send({
            status: "Failure",
            message: e.message
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        console.log("Hello");
        const posts = await Post.deleteOne({_id: req.params.id });
        res.status(200).json({
            status: "Successfully deleted post",
            posts
        })
    }
    catch (e) {
        res.status(500).send({
            status: "Failure",
            message: e.message
        })
    }
})

module.exports = router;

// {
//     $set:{
//         title: req.body.title,
//         body: req.body.body,
//         image: req.body.image,
//         user: req.user
//     }
// }