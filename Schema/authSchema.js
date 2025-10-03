import mongoose from "mongoose";
const AuthSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
});

export default mongoose.models.Auth || mongoose.model("Auth", AuthSchema);