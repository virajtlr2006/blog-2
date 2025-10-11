'use client'

import { deletepostAction, singlePostAction } from '@/Action/postAction'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/Components/ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@clerk/nextjs'

const page = () => {
    const [showpost, setshowpost] = useState(null)
    const [userid, setuserid] = useState(null)
    const user = useUser()
    useEffect(() => {
        if (user.user) {
            setuserid(user.user.username);

        }
    }, [user])



    const router = useRouter()
    useEffect(() => {
        singlePost()
    }, [])


    const { id } = useParams()

    const singlePost = async () => {
        const save = await singlePostAction(id)
        console.log(save);

        const email = userid
        setshowpost(save)
    }

    const editpost = async () => {
        router.replace(`./edit/${showpost._id}`)
    }
    const deletepost = async () => {
        await deletepostAction(id)
        router.replace("/")
    }
    return (
        <div className='h-240 ml-55 mt-5 '>
            {showpost && <>

                <div className=' '>
                    <Card className='flex flex-col gap-5 h-full w-150 p-0 overflow-hidden mx-auto'>
                        <CardHeader>
                            <div className='flex mt-5  gap-3 items-center'>
                                <Avatar className='border-2 border-green-600 rounded-full'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                                <CardTitle><p className='text-xl font-semibold'>{showpost.email}</p></CardTitle>
                            </div>
                        </CardHeader>
                        <div className='mx-8 font-bold '>
                            <CardDescription> <p>{showpost.description}</p></CardDescription>
                        </div>
                        <CardContent className='flex flex-col items-center justify-center p-4 text-center'>
                            <img src={showpost.image} className='border-4 rounded-lg w-full max-w-md object-cover ' />
                        </CardContent>

                        <div className='flex flex-col gap-3 px-20 pb-3'>
                            <Button className='bg-blue-700 hover:shadow-md shadow-blue-900' onClick={editpost}>Edit</Button>
                            <Button className='bg-red-700 hover:shadow-md shadow-red-900' onClick={deletepost}>Delete</Button>
                        </div>
                    </Card>

                </div>
            </>}
        </div>
    )
}

export default page
