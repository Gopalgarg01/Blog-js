const mongoose = require('mongoose')
const colors = require("colors")
const connectDB = async () =>{
   
    try{        
        await mongoose.connect(process.env.MON_URL)
        console.log("connection successfull")
    }catch(error){
        console.log(`Mongo connect error ${error}`)
    }
}

module.exports = connectDB;