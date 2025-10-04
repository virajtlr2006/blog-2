'use client'
import { loginAction } from '@/Action/authAction'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"


const page = () => {

    const [errormsg, setErrormsg] = useState(null)

    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (user) => {
        try {
            // console.log(user);
            await loginAction(user)
            localStorage.setItem('email', user.email)
            router.replace("/")
        } catch (error) {
            setErrormsg(error.message)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email */}
                <input {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
                {/* Password */}
                <input {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                {/* Error to display on screen */}
                {errormsg && <>
                    <p>{errormsg}</p>
                </>}

                <input type='submit' />
            </form>
        </div>
    )
}

export default page
