const mongoose = require("mongoose")

const imgSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

const image = mongoose.model('image', imgSchema)
module.exports = image