import * as React from 'react';
import {AppBar, Tab, Tabs, Box, Toolbar, Typography, Button} from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Navigate ,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import { authActions } from '../redux/store';

// import {useNavigate} from "react-router-dom";


export default function NavBar() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.isLogin);
  console.log(isLogin);
  // const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleLogout = ()=>{
    try{
      dispatch(authActions.logout());
      alert("Logout successfully");
      Navigate("/login");
    }catch(error){
        console.log(error);
    }

  }
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            
          {/* </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOG JS
          </Typography>
          {isLogin &&(
            <Box display={"flex"} >
            <Tabs textColor='inherit' value={value} onChange={(e,val)=> setValue(val)} >
                <Tab label='Blogs' LinkComponent={Link} to='/blogs'/>
                <Tab label='My Blogs' LinkComponent={Link} to='/myBlogs'/>
                <Tab label='Create Blogs' LinkComponent={Link} to='/createBlogs'/>
            </Tabs>
            </Box>
          )}
          
          <Button color="inherit" LinkComponent={Link} to="/login"
          // onSubmit={() =>navigate("/Register")}
          >Login</Button>
          <Button color="inherit" LinkComponent={Link} to="/register">Register</Button>

          {isLogin &&(
          <Button onClick={handleLogout}color="inherit" variant="outlined">Logout</Button>)}

          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
