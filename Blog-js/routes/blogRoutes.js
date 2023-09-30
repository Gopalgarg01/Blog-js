const express = require("express");
const blogModel = require("../models/blogModel");
const {
    getAllBlogRouter,
    createBlogRouter,
    updateBlogRouter,
    getBlogByController,
    getuserBlogs,
    deleteBlogRouter
} = require('../controllers/blogController')

const router = express.Router();

router.get('/all-blog', getAllBlogRouter);

router.post('/create-blog', createBlogRouter);

router.put('/update-blog/:id', updateBlogRouter);

router.get('/all-blog/:id', getBlogByController);

router.get('/user-blog/:id', getuserBlogs);

router.delete('/delete-blog/:id', deleteBlogRouter);

module.exports = router;