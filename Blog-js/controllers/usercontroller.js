
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.registerController = async(req,res) =>{
    
    try{
        console.log(req.body);
        let{username, email, password} = req.body;

        if(!username || !email || !password){
            return res.send({
                success: false,
                message: "Please fill all details"
            })
        }
        const existuser = await userModel.findOne({email})
        if(existuser){
            return res.status(400).send({
                success:false, 
                message:"user already exists"
            })
            
        }
        const hashedpassword = await bcrypt.hash(password,10);
        password = hashedpassword;
        const user = new userModel({username, email, password});
        await user.save();
        return res.status(201).send({
            message:"new user created",
            success: true,
            
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message:"Error in Register Callback", 
            success:false,
            error 

        })
    }
};
exports.getAllusers = () =>{
    
};
exports.loginController = async(req, res) =>{
    try{
        const{email, password, _id} = req.body;
        if(!email || !password){
            return res.send(400).send({
                success:false,
                message: "please fill the details correctly"
            })

        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.send(400).send({
                success:false,
                message:"user not find",
               
            })
        }
        return res.status(201).send({
            message:"userLoggin",
            success: true,
            user
        })
    }catch(error){
        console.log(error);
        return res.send(500).send({
            success:false,
            message:"Error in callback",
        })
       
    }
};

