'use client'
import { editProfileAction, profileAction } from '@/Action/authAction'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

const page = () => {

    const [olddata, setOlddata] = useState(null)      

    useEffect(() => {
        getoldData()
    }, [])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (user) => {
        // console.log(user);
        const email = localStorage.getItem("email")
        editProfileAction(email);
    }

    const getoldData = async () => {
        const email = localStorage.getItem("email")
        const old = await profileAction(email)
        setOlddata(old);
        
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input placeholder='name' {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}

                <input placeholder='image' {...register("image")} />
                {errors.image && <span>This field is required</span>}

                <input placeholder='password' {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
}

export default page
