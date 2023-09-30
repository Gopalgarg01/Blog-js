const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const bodyparser = require('body-parser');
const app = express();
// app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

// Body-parser middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))





dotenv.config();

connectDB();

const testRoute = require("./routes/userroutes");
const blogRoute = require("./routes/blogRoutes");


app.use("/user", testRoute);
app.use("/blogs", blogRoute);



// app.get("/", (req,res) =>{
//     res.status(200).send({
//         "message" : "Node server"
//     })
// })

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port number ${PORT} `)
})