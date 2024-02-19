const mongoose=require("mongoose")

const pictureSchema=mongoose.Schema({
    quote:{type:String,required:true},
    photo:{type:String,required:true},
    device:{type:String,required:true},
    commentscount:{type:Number,default:0},
    userID:{type:String,required:true},
    author:{type:String,required:true}
})

const PictureModel=mongoose.model("picture",pictureSchema)

module.exports={
    PictureModel
}