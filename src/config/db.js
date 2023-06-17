const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connect = ()=>{
    return mongoose.connect(
        process.env.DATABASE
    )
}

module.exports = connect;
