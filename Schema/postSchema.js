import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title : {type:String},
    email : {type:String},
    description : {type:String},
    image : {type:String},
    like : [{type:String}],
})

export default mongoose.models.Post || mongoose.model("Post", PostSchema);