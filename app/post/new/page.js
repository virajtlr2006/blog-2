'use client'
import { newpostAction } from '@/Action/postAction'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const page = () => {
  const router = useRouter()
  const [userid, setuserid] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const user = useUser()

  useEffect(() => {
    if (user.user) {
      setuserid(user.user.username)
    }
  }, [user])

  const newpost = async (post) => {
    try {
      await newpostAction({
        ...post,
        email: userid
      })
      router.replace("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pl-55'>
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200 p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl font-bold">Create New Post</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(newpost)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" {...register("title", { required: true })} />
              {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter description" {...register("description", { required: true })} />
              {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="Enter image URL" {...register("image", { required: true })} />
              {errors.image && <p className="text-red-500 text-sm">Image URL is required</p>}
            </div>
          </CardContent>

          <CardFooter className="pt-6 flex justify-end">
            <Button type="submit">Post</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  )
}

export default page