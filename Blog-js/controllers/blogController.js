const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

exports.getAllBlogRouter = async(req , res) =>{
    try{
        const blog = await blogModel.find({}).populate("user");
        if(!blog){
            return res.status(200)
            .send({
                success:false,
                message: "please fill the details correctly"
            });

        }
       
        return res.status(200)
        .send({
            success:true,
            Blogcount: blog.length,
            message:"All blogs listed",
            blog,
        });
       
    }catch(error){
        console.log(error);
        return res.status(400)
        .send({
            success:false,
            message:"Error in callback",
           
        });
        // return res.status(500).send({
        //     message:"Error in Register Callback", 
        //     success:false,
        //     error 

        // })
       
    }
};

exports.createBlogRouter = async( req, res) =>{
    try{
        console.log(req.body);
        let {title, description, image, user} = req.body;
        if(!title || !description || !image | !user){
            return res.status(400).send({
                success: false,
                message: "Please fill all details"
            });
        }
        const existuser = await userModel.findById(user)
        if(!existuser){
            return res.status(400).send({
                success: true,
                message: "user does not exist"
            })
        }
        const newBlog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existuser.blogs.push(newBlog);
        await existuser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        
        
        return res.status(201).send({
            success: true, 
            message: "Blog created",
            newBlog,
        });  
        
    }catch(error){
       
        console.log(error);
        return res.status(400)
        .send({
            success:false,
            message:"Error in callback",
        });
    }
};
exports.updateBlogRouter = async(req, res) =>{
    try{
        console.log(req.body);
        const {id} = req.params;
        const {title,description, image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{ ...req.body}, {new:true});
        return res.status(200).send({
            success: true,
            message: "Block updated"
        });
    
    
        
    }catch(error){
       
        console.log(error);
        return res.status(400)
        .send({
            success:false,
            message:"Error while updating blog",
        });
    }
};
exports.getBlogByController = async(req, res) =>{
    try{
        const {id} = req.params
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(400).send({
                success:false,
                message:"counld find the blog"
            });
        }
        return res.status(200).send({
            success:true,
            message:"fetch single blog",

        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success : false,
            message: "erroe while getting single day blog"
        });
    }
};
exports.deleteBlogRouter = async(req , res) =>{
    try{
        await blogModel.findOneAndDelete(req.params.id);
        return res.status(400).send({
            success: true,
            message: "blog deleted"
        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success : false,
            message: "erroe while getting single day blog"
        });
    }
};

exports.getuserBlogs = async(req, res) =>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(400).send({
                success: false,
                message: "did not find the blogs"
            });
        }
        return res.status(200).send({
            success:true,
            message: "user blogs",
            userBlog
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error please chech again"
        })
    }
}

    
    
    
    