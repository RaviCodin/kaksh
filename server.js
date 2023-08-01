const app = require("./app.js")
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')



const createDBConnection = require("./config/database.js");


createDBConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

});

const PORT = process.env.PORT  || 5500

app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})