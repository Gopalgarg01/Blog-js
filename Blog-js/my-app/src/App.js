import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import{AppBar,Toolbar,IconButton,Typography, MenuIcon,TextField } from '@mui/material';
import NavBar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs';
import CreateBlogs from './pages/CreateBlogs';
import Blogdetails from './pages/Blogdetails';

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Blogs></Blogs>}> </Route>
         <Route path="/blogs" element={<Blogs></Blogs>}> </Route>
         <Route path="/login" element={<Login/>}> </Route>
         <Route path="/myBlogs" element={<UserBlogs/>}> </Route>
         <Route path="/blog-details/:id" element={<Blogdetails/>}> </Route>
         <Route path="/register" element={<Register/>}> </Route>
         <Route path="/createBlogs" element={<CreateBlogs/>}> </Route>
      </Routes>

      {/* <Register></Register> */}
      {/* <Login></Login> */}
    </>
  );
}

export default App;
