import  React,{useState}  from 'react';
import {useNavigate} from "react-router-dom";
import{Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { authActions } from '../redux/store';


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs , setInputs] =  useState(
        [{
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
          const {data} = await axios.post("/user/loggedin",{ email:inputs.email , password:inputs.password});
          if(data.success){
            // console.log(data._id);
            localStorage.setItem('userId', data?.user._id);
            // console.log(data.user._id);
            dispatch(authActions.login());
            alert("user Loggein successfully");
            navigate("/blogs");
            
          }

        }catch(error){
            console.log(error);
        }
        console.log(inputs);
      }
  
    return (
        <>
        <form onSubmit={handleSubmit}  >
            <Box  
            marginTop={5}
            marginLeft={65}
            maxWidth={500}    
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ boxShadow: 3 , borderRadius: 1 }}
            // sx={{ borderRadius: 1 }}
            >
            
            <Typography variant="h3" padding={2}>Login</Typography>
            
            <TextField onChange={handleChange} placeholder='email' value={inputs.email} name="email" margin='normal' type={"email"}></TextField>
            <TextField onChange={handleChange} placeholder = 'password' value={inputs.password} name="password" margin='normal' type={"password"}></TextField>
            <Button type='submit' sx={{marginTop:3}} variant='contained' color='primary'>Login</Button>
            <Button  sx={{marginTop:3}}margin='normal'  color='primary'>Already register? Please Login </Button>
            </Box>
        </form>
        </>
        )
}
