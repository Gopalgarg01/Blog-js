// import React from 'react'
import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import BlogCard from '../pages/BlogCard';

export default function Blogs() {
  const[blogs, setblogs] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  
  const getAllBlocks = async() =>{
    try{
        const {data} = await axios.get("/blogs/all-blog");
        if(data.success){
            setblogs(data.blog);
        }
    }catch(error){
      console.log(error);

    }
  }
  useEffect(()=>{
    getAllBlocks();
  },[]);

  const styles = {
    container: {
        // display: 'flex',
        height: '100%',
        
    }
    
};

  return (
    <>
    <div style={styles.container}>
      {blogs && blogs.map((blog) => <BlogCard
      id = {blog?._id}
      isUser = {localStorage.getItem('userId') === blog.user._id}
      title = {blog.title}
      description = {blog.description}
      image = {blog.image}
      username = {blog.user.username}
      // time = {blog.createdAt}
      />)}   
    </div>
   
    </>
    );

  
  



}

