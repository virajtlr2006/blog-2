'use client'
import { userallPostAction } from '@/Action/postAction'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [userallpost, setuserallpost] = useState(null)
    const [userid, setuserid] = useState(null)
    const [loading, setisloading] = useState(true)


    const user = useUser()

    useEffect(() => {
        if (user.user) {
            setuserid(user.user.username);
            setisloading(false)
        }

    }, [user])
    
    useEffect(() => {
        if (userid) { myposts() }

    }, [loading])


    const myposts = async () => {
        const email = userid
        console.log(email);
        const post = await userallPostAction(email)
        console.log(post);
        setuserallpost(post)
    }
    return (
        <div>
            {userallpost && userallpost.map((p) => <div key={p._id}  className='pl-50'>
                <a  href={`/post/${p._id}`}>
                    <div key={p._id}>
                        <img src={p.image} />
                        <p>{p.email}</p>
                    </div>
                </a>
            </div>)
            }
        </div>
    )
}

export default page
