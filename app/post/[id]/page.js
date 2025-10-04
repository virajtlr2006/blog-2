'use client'

import { deletepostAction, singlePostAction } from '@/Action/postAction'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [showpost, setshowpost] = useState(null)

    const router = useRouter()
    useEffect(() => {
        singlePost()
    }, [])


    const { id } = useParams()

    const singlePost = async () => {
        const save = await singlePostAction(id)
        const email = localStorage.getItem("email")
        setshowpost(save)
    }

    const editpost = async () => {
        router.replace(`post/edit/${showpost._id}`)
    }
    const deletepost = async () => {
        await deletepostAction(id)
        router.replace("/")
    }
    return (
        <div>
            {showpost && <>
                <p>{showpost.title}</p>
                <img src={showpost.image} />
                <p>{showpost.description}</p>
                
                    <button onClick={editpost}>Edit</button>
                    <button onClick={deletepost}>Delete</button>
                
            </>}
        </div>
    )
}

export default page
