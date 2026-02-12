const mongoose = require("mongoose")

async function connectDB(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB