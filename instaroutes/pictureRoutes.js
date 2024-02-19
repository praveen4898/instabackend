const express=require("express")
const { auth } = require("../middleware/authmiddleware")
const { PictureModel } = require("../model/picturemodel")


const pictureRouter=express.Router()



//addition of picture
pictureRouter.post("/",auth,async(req,res)=>{
    try {
        const picture=PictureModel(req.body)
        await picture.save()
        res.status(200).send({"msg":"new picture has been added"})
    } catch (error) {
        res.status(500).send({"msg":"error occured"})
    }
})


//view all pictures
pictureRouter.get("/",auth,async(req,res)=>{
    try {
        const picture=await PictureModel.find({userID:req.body.userID})
        res.status(200).send({"msg":"pictures available are",picture})
    } catch (error) {
        res.status(500).send({"msg":"error occured"})
    }
})

//to edit a picture
pictureRouter.patch("/:pictureID",auth,async(req,res)=>{
    const {pictureID}=req.params
    try {
        const picture=await PictureModel.findOne({_id:pictureID})
        if(picture.pictureID==req.body.pictureID){
            await PictureModel.findByIdAndUpdate({_id:pictureID},req.body)
            res.status(200).send({"msg":"picture has been updated"})
        }
        else{
            res.status(500).send({"msg":"error"})
        }

    } catch (error) {
        res.status(500).send({"msg":"error occured"})
    }
})


pictureRouter.delete("/:pictureID",auth,async(req,res)=>{
    const {pictureID}=req.params
    try {
        const picture=await PictureModel.findOne({_id:pictureID})
        if(picture.pictureID==req.body.pictureID){
            await PictureModel.findByIdAndDelete({_id:pictureID},req.body)
            res.status(200).send({"msg":"picture has been deleted"})
        }
        else{
            res.status(500).send({"msg":"error"})
        }

    } catch (error) {
        res.status(500).send({"msg":"error occured"})
    }
})






module.exports={
    pictureRouter
}