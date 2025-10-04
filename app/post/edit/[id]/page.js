'use client'
import { editPostAction } from '@/Action/postAction'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"

const page = () => {
  const router = useRouter()

  const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


  const {id} = useParams()
  console.log(id);

  const onSubmit =async (user) => {
    await editPostAction({...user,"id":id})
    router.replace("/")
  }
  
  return (
    <div>
  <form  onSubmit={handleSubmit(onSubmit)}>

                <input {...register("title", { required: true })} />
                {errors.title && <span>This field is required</span>}

                <input {...register("description", { required: true })} />
                {errors.description && <span>This field is required</span>}

                <input type="submit" />
            </form>
    </div>
  )
}

export default page
