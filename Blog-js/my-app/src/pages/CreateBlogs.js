import React, {useState} from 'react';
import { Box, Button, InputLabel, TextField, Typography, inputClasses } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CardActionsreateBlogs() {
    const navigate = useNavigate();
    
    const [inputs , setInputs] = useState({
        title:'',
        description:'',
        image:''
    });
    const id = localStorage.getItem('userId');
    const handleChange = (e) =>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        try{
            const {data } = await axios.post("/blogs/create-blog/",{
                title: inputs.title,
                description:inputs.description,
                image: inputs.image,
                user: id,
            })
            if(data.success){
                alert("Blogs created");
                navigate("/myBlogs");
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Box width={'50%'} margin="auto" border={3} boxShadow={"10px 10px 20px #ccc"} padding={3} borderRadius={8} display ="flex" flexDirection={"column"}> 
                <Typography variant='h3' textAlign={'center'} fontWeight={'bold'} padding={3} color={"grey"}>
                Create a Post
                </Typography>
                <InputLabel sx={{mb:1 , mt:2 ,fontSize: "24px", fontWeight:"bold"}}> Title
                </InputLabel>
                <TextField 
                name='title'
                value={inputs.title}
                 onChange={handleChange} margin='normal' variant='outlined'
                 required></TextField>
                 <InputLabel sx={{mb:1 , mt:2 ,fontSize: "24px", fontWeight:"bold"}}> Description
                </InputLabel>
                 <TextField 
                 name='description'
                value={inputs.description}
                 onChange={handleChange} margin='normal' variant='outlined'
                 required></TextField>
                 <InputLabel sx={{mb:1 , mt:2 ,fontSize: "24px", fontWeight:"bold"}}> Image url
                </InputLabel>
                 <TextField 
                 name='image'
                value={inputs.image}
                 onChange={handleChange} margin='normal' variant='outlined'
                 required></TextField>
                 <Button  sx={{ mt:2 }}variant="contained" type='submit'> Submit</Button>
            </Box>
        </form>
    </>
  )
}
