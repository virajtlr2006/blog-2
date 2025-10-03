'use server'

import { connectDB } from "@/Utils/mongoconnect"
import Auth from "@/Schema/authSchema"
import { parseJSON } from "@/Utils/parse"

// Signup

export const signupAction = async (user) => {
    try {
        // console.log(user)
        await connectDB() //Connects MongoDB
        const newUser = await Auth.create(user)
        return { "msg": "SignUp success" }
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}

// Login

export const loginAction = async (user) => {
    // console.log(user);
    await connectDB()
    const dbPerson = await Auth.findOne({"email":user.email}) 
    console.log(dbPerson);

    if(!dbPerson) throw new Error("SignUp First");
    
    else if(user.password != dbPerson.password) throw new Error("invalid Password");

    console.log("login success");
    
    return {"msg":"Login Success"}
    
}