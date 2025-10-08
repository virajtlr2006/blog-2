'use server'

import { connectDB } from "@/Utils/mongoconnect"
import Post from "@/Schema/postSchema"
import { parseJSON } from "@/Utils/parse"

// New Post

export const newpostAction = async (post) => {
    try {
        // console.log(post);
        await connectDB()
console.log({ ...post,"comment":[{"ii":"ikiiiiiiii"}] });
        const newPost = await Post.create({ ...post,"comment":"kkklkk"})
        // console.log({...post,"like":["hhhh"]});
        return { "msg": "Post Created Successfully" }
    } catch (error) {
        throw new Error("Internal server error");

    }

}

// All Post

export const allpostAction = async () => {
    await connectDB()
    const all = await Post.find({})
    // console.log(parseJSON("uijujhujh",all))
    return parseJSON(all)
}

// Edit Post of a User

export const editPostAction = async (post) => {
    // console.log(post)
    await connectDB()
    const editpost = await Post.findByIdAndUpdate(post.id, post)
    // console.log(editpost);
    return parseJSON(editpost)
}

// Single Post

export const singlePostAction = async (id) => {
    // console.log(id)
    await connectDB()
    const post = await Post.findById(id)
    // console.log(post);
    return parseJSON(post)
}

// Delete Post

export const deletepostAction = async (id) => {
    await connectDB()
    const deletepost = await Post.findByIdAndDelete(id)
    return { "msg": "Post Deleted Successfully" }
}

// User all posts

export const userallPostAction = async (email) => {
    // console.log(email)
    await connectDB()
    const userPosts = await Post.find({ email })
    // console.log(userPosts)
    return parseJSON(userPosts)
}

// Like Count 

export const likeAction = async (email, id) => {
    // console.log(email,id);
    const userpost = await Post.findById(id)
    if (userpost.like.includes(email)) {
       userpost.like =  userpost.like.filter((p) => p != email)
        await userpost.save()
    }
    else {
        userpost.like.push(email)
        // console.log(userpost);
       await  userpost.save()
    }

    return {}
} 

// Comment

export const commentAction = async (comment,email,id) => {
    console.log(comment,email,id);
    const post = await Post.findById(id)
if(post.comment == null || post.comment ==undefined){
   
    post.comment = "kkkkkk,"
    console.log(post);
    
    await post.save()
    
}
    
}