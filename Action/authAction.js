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
    await connectDB() //Connect DB
    const dbPerson = await Auth.findOne({ "email": user.email })  //Find the user in databse 
    // console.log(dbPerson);
    if (!dbPerson) throw new Error("SignUp First"); //If user not found in DB

    else if (user.password != dbPerson.password) throw new Error("invalid Password");
    // console.log("login success");
    return { "msg": "Login Success" }
}

// Profile

export const profileAction = async (email) => {
    await connectDB() //DB connected
    // console.log(email);
    const dbuser = await Auth.findOne({ email }) //Find user in Database
    // console.log(dbuser);
    if (!dbuser) throw new Error("SignUp First");
    // console.log(parseJSON(dbuser));
    return parseJSON(dbuser)
}