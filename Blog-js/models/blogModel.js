const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "title is required"]
    }, 
    description:{
        type:String,
        required:[true, "description is required"]
    },
    image:{
        type:String,
        message:"check krlo bhai"

    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, "user id is required"]
    }
    
})
const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
