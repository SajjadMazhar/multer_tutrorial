const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Image = require("./models/imgModel")
const multer = require("multer")
const port = 4500

app.use(express.json())

// mongo connection
const mongoConnection = ()=>{
    mongoose.connect("mongodb://localhost:27017/multer-uploads")
    .then((e)=>{
        console.log("connection successful with mongo")
    }).catch(err=>{
        console.log(err.message)
    })
}
mongoConnection()
//setting disk storage
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({
    storage:Storage
}).single('testImage')

app.post("/upload", (req, res)=>{
    upload(req, res, err=>{
        if(err){
            console.log(err.message)
        }else{
            const newImage = Image({
                name:req.body.name,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save().then(()=>res.send("success upload"))
            .catch(err=>console.log(err.message))
        }
    })
})

app.listen(port, ()=>{
    console.log("server is listening to port", port)
})