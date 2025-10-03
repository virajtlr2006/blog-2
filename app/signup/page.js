'use client'
import { useForm } from "react-hook-form"
import React from 'react'
import { signupAction } from "@/Action/authAction"
import { useRouter } from "next/navigation"

const page = () => {
    const router  = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (user) => {
        try {
            await signupAction(user)
            router.replace("/login")
        } catch (error) {
            alert ("Internal server Error")
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <input placeholder="name" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}
                {/* Email */}
                <input placeholder="email" {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
                {/* Password */}
                <input placeholder="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                {/* Submit button */}
                <input type="submit" />
            </form>
        </div>
    )
}

export default page
