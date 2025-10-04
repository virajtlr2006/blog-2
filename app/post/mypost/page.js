'use client'
import { userallPostAction } from '@/Action/postAction'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [userallpost, setuserallpost] = useState(null)

    useEffect(() => {
        myposts()
    }, [])


    const myposts = async () => {
        const email = await localStorage.getItem("email")
        console.log(email);
        const post = await userallPostAction(email)
        console.log(post);
        setuserallpost(post)
    }
    return (
        <div>
            {userallpost && userallpost.map((p) => <>
                <a  href={`/post/${p._id}`}>
                    <div key={p._id}>
                        <img src={p.image}/>
                    </div>
                </a>
            </>)
            }
        </div>
    )
}

export default page
