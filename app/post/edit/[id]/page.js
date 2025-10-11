'use client'
import { editPostAction } from '@/Action/postAction'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

const page = () => {
  // Router & local state
  const router = useRouter()
  const [userid, setuserid] = useState(null)

  // Auth — get current user id/username
  const user = useUser()
  useEffect(() => {
    if (user.user) {
      setuserid(user.user.username)
    }
  }, [user])

  // Form — register inputs and handle submission
  const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

  // Params — grab post id from route
  const {id} = useParams()
  // Submit — call server action then redirect to home
  const onSubmit = async (user) => {
    await editPostAction({ ...user, id })
    router.replace("/")
  }
  
  return (
    <div>
      {/* UI — basic edit form (title, description) */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title input */}
        <input {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}

        {/* Description input */}
        <input {...register("description", { required: true })} />
        {errors.description && <span>This field is required</span>}

        {/* Submit */}
        <input type="submit" />
      </form>
    </div>
  )
}

export default page
