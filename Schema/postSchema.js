import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title : {type:String},
    email : {type:String},
    description : {type:String},
    image : {type:String},
    like : [{type:String}],
    like : [{type:Object}]
})

export default mongoose.models.Post || mongoose.model("Post", PostSchema);