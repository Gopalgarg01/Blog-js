import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BlogCard from '../pages/BlogCard';
export default function UserBlogs() {
    const[blogs, setBlogs] = useState([]);
    const getUserBlogs = async()=>{
        try{
            const id = localStorage.getItem('userId');
            const {data} = await axios.get(`/blogs/user-blog/${id}`);
            if(data.success){
                setBlogs(data.userBlog.blogs)
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getUserBlogs();
    },[]);
  return (
    <div>
        {blogs && blogs.length > 0 ? (blogs.map((blog) => ( <BlogCard
        id = {blog._id}
        title = {blog.title}
        description = {blog.description}
        image = {blog.image}
        username = {blog.user.username}
        // time ={blog.createdAt}
        />
        ))
        ):(<h2> Please wait</h2>
        )}  
       
        </div>
  )
}
