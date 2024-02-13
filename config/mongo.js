const mongoose = require('mongoose')

const dbConnect = (uri)=>{
    return mongoose.connect(uri)
    .then(()=>{
        console.log("DB Connected.")
    })
    .catch((err)=>{
        console.log("Failed to connect to DB.\nERR:", err)
    });
}

module.exports = dbConnect;