'use client'
import { newpostAction } from '@/Action/postAction'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from "react-hook-form"

const page = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const newpost = async (post) => {
        try {
            await newpostAction(post);
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
