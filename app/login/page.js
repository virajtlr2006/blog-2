'use client'
import { loginAction } from '@/Action/authAction'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

const page = () => {

    // Local state — error messages
    const [errormsg, setErrormsg] = useState(null)

    // Router & form setup
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // Action — authenticate user and redirect
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
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">Login</h1>
                <p className="text-sm text-gray-500 text-center mt-1">Sign in to your account</p>
            </div>

            {/* Login form */}
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
