const mongoose=require('mongoose')

/**
 * create models which will interact with our system by defining the schema
 *
 * Schema used to represent how the model look by defining the structure of the of your database
 */

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
      type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("UserModel",userSchema)

