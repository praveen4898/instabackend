const express=require("express")
const { UserModel } = require("../model/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()




userRouter.post("/register",async(req,res)=>{
    try {
        const {username,email,password,city,age,gender}=req.body
        const existinguser=await UserModel.findOne({email});
        if(existinguser){
            return res.status(500).send({"msg":"user with this email already exist"})
        }
        bcrypt.hash(password,5,(err, hash)=>{
            // Store hash in your password DB.
            const user= new UserModel({username,email,password:hash,city,age,gender})
              user.save()
             res.status(200).send({"msg":"new user has been registered succeddfully"})
        });
        
    } catch (error) {
        res.status(500).send({error})
    }
})


userRouter.post("/login",async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.findOne({email})
        bcrypt.compare(password, user.password, (err, result)=>{
           if(result){
            const token = jwt.sign({ userID:user._id }, 'masai',{expiresIn:"7d"});
            res.status(200).send({"msg":"user logged in successfully",token})
           }
           else{
            res.status(500).send({"msg":"Error occured"})
           }
        });
    } catch (error) {
        res.status(500).send({"msg":"Invalid credentials"})
    }
})


module.exports={
    userRouter
}