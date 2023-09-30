import  React,{useState}  from 'react';
import {useNavigate} from "react-router-dom";
import{Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [inputs , setInputs] =  useState(
    [{
    username:"", 
    email:"",
    password:""
  }]
  );

  const handleChange = (e) =>{
    setInputs((prevState) =>({
      ...prevState,
      [e.target.name]: e.target.value,
      
    }));  
  };
  const handleSubmit =async(e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post("/user/register",{username: inputs.username, email:inputs.email , password:inputs.password});
      if(data.success){
        alert("user register succesfully");
        navigate("/login");
        
      }

    }catch(error){
        console.log(error);
    }
    console.log(inputs);
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <Box       
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}       
        padding={3}      
        >
        
        <Typography variant="h3" padding={2}>Register</Typography>
        <TextField onChange={handleChange} placeholder='username' value={inputs.username} name="username"margin='normal' type={"text"}></TextField>
        <TextField onChange={handleChange} placeholder='email' value={inputs.email} name="email" margin='normal' type={"email"}></TextField>
        <TextField onChange={handleChange} placeholder = 'password' value={inputs.password} name="password" margin='normal' type={"password"}></TextField>
        <Button type='submit' sx={{marginTop:3}} variant='contained' color='primary'>Submit</Button>
        <Button type='submit' sx={{marginTop:3}}margin='normal'  color='primary'>Already register? Please Login </Button>
        </Box>
    </form>
    </>
    
  )
}
