const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect(
        "mongodb+srv://harshal2993:Welcome_1021@cluster0.ylf9n.mongodb.net/petbacker"
    )
}

module.exports = connect;