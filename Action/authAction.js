'use server'

import { connectDB } from "@/Utils/mongoconnect"

 
export const signupAction = async (user) => {
    console.log(user)
    connectDB()
    console.log("MongoDb connected successfully");
    
}