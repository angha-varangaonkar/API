const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/Users").then(()=>{
    console.log("mongodb is Connect")
})





const UserShema = mongoose.Schema({
    name:{
        type:String
    },

    Email:{
        type:String
    },

    Password:{
        type:Number
    }

})


const User = mongoose.model("User",UserShema)



app.post("/api/createData",async(req,res)=>{
  const UserCreateData =  await User.create(req.body)
  res.json({
    data:UserCreateData
  })

})


app.get("/api/getData",async(req,res)=>{
  const UserGetData =  await User.find()
  res.json({
    length:UserGetData.length,
   Data: UserGetData
  })
})






app.delete("/api/deleteData/:id",async(req,res)=>{
   const deleteData =  await User.findByIdAndDelete(req.params.id)
    res.json({
       data: deleteData
    })
})



// app.put("/api/DataUpdate/:id",async(req,res)=>{
//  const updateData =   await User.findByIdAndUpdate(req.params.id)
// res.json({
//   data:  updateData
// })
// })


app.put("/api/dataUpdate/:id",async(req,res)=>{
  console.log(req.body)
  try {
    const updatedData = await User.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.status(201).json({
      data : updatedData
    }
    )
  } catch (error) {
    res.status(400).send(error)
  }
})



















app.listen(8000,()=>{
    console.log("Server is Running on port:- 8000")

})