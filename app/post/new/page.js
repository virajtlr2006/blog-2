'use client'
import { newpostAction } from '@/Action/postAction'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"


const page = () => {
    const router = useRouter()
    const [userid, setuserid] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const user = useUser()

    useEffect(() => {
        if (user.user) {
            setuserid(user.user.username);

        }
    }, [user])

    const newpost = async (post) => {
        try {
            await newpostAction({
                ...post,
                "email": userid
            })
            router.replace("/")
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(newpost)}>

                <input placeholder='title' {...register("title", { required: true })} />
                {errors.title && <span>This field is required</span>}

                <input placeholder='description' {...register("description", { required: true })} />
                {errors.description && <span>This field is required</span>}

                <input placeholder='image' {...register("image", { required: true })} />
                {errors.image && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
}

export default page
