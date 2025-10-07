'use client'
import { useForm } from "react-hook-form"
import React from 'react'
import { signupAction } from "@/Action/authAction"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


const page = () => {
    const router = useRouter()
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
            alert("Internal server Error")
        }

    }
    return (
        <div className="grid grid-cols-2 min-h-screen">

            <div className="bg-green-500" >
                Imaghe
            </div>
            {/* <div className="bg-yellow-500"> */}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-red-500 pt-10 px-30">
                <div className='bg-amber-500'>

                    <h1 className="pb-5">Sign Up</h1>
                    <div className="flex flex-col gap-3">


                    {/* Name */}
                    <div>

                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            id="name"
                            {...register("name", { required: true })} />
                        {/* Name Error */}
                        {errors.name &&

                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Name is required</AlertTitle>
                            </Alert>
                        }
                    </div>

                    {/* Email */}
                    <div>

                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            id="email"
                            {...register("email", { required: true })}
                            />
                        {/* Email Error */}
                        {errors.email &&
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Email is required</AlertTitle>
                            </Alert>}
                    </div>

                    {/* Password */}
                    <div>

                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            id="password"
                            {...register("password", { required: true })}
                            />
                        {/* Password Error */}
                        {errors.password &&
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Password is required</AlertTitle>
                            </Alert>}
                    </div>

        </div>
                    {/* Submit button */}
                    <Button type='submit'>Signup</Button>
                </div>
            </form>
        </div>

        // </div>
    )
}

export default page
