const express=require("express")
const { Connection } = require("./config/db")
const { userRouter } = require("./instaroutes/userRoutes")
const { pictureRouter } = require("./instaroutes/pictureRoutes")
require("dotenv").config()
const app=express()
app.use(express.json())

app.use("/users",userRouter)
app.use("/pictures",pictureRouter)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await Connection
        console.log("connected to db")
        console.log(`server is running at ${process.env.PORT}`)

    } catch (error) {
        console.log(error)
    }
})