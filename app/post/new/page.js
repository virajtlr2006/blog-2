'use client'
// Page: Create New Post — form to publish a new post
// Features: image preview, title, caption input, form validation
import { newpostAction } from '@/Action/postAction'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Image } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCurrentUser } from '@/hooks/useCurrentUser'

const page = () => {
  // Router & state — navigation, image preview
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState(null)
  const { username, imageUrl, isLoaded } = useCurrentUser()
  
  // Form — register inputs, validation, submission
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const watchImage = watch("image")

  // Effect — update image preview when URL changes
  useEffect(() => {
    if (watchImage && watchImage.startsWith('http')) {
      setImagePreview(watchImage)
    }
  }, [watchImage])

  // Action — submit form data to create new post
  const newpost = async (post) => {
    try {
      await newpostAction({
        ...post,
        email: username
      })
      router.replace("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pl-64">
      <div className="max-w-2xl mx-auto pt-6">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 mb-0">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Create new post</h1>
            <div></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(newpost)} className="bg-white">
          {/* Image Upload Section */}
          <div className="border-b border-gray-200 p-6">
            {imagePreview ? (
              <div className="relative aspect-square max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview(null)}
                />
              </div>
            ) : (
              <div className="aspect-square max-w-md mx-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                <Image size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 text-center mb-2">Share a photo to get started</p>
                <p className="text-sm text-gray-400 text-center">Your photo will appear here</p>
              </div>
            )}
            
            <div className="mt-4">
              <Label htmlFor="image" className="text-sm font-medium text-gray-700">Photo URL</Label>
              <Input 
                id="image" 
                placeholder="Enter image URL" 
                className="mt-1"
                {...register("image", { 
                  required: "Image URL is required",
                })} 
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>
          </div>

          {/* Post Details */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img 
                src={imageUrl || `https://picsum.photos/40/40?random=user`}
                className="w-10 h-10 rounded-full object-cover"
                alt="Your profile"
              />
              <span className="font-semibold text-gray-900">{username}</span>
            </div>

            {/* Caption */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Caption</Label>
              <Textarea
                id="description"
                placeholder="Write a caption..."
                className="mt-1 resize-none border-none focus:ring-0 text-sm"
                rows={3}
                {...register("description", { required: "Caption is required" })}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
              <Input 
                id="title" 
                placeholder="Add a title..." 
                className="mt-1 border-none focus:ring-0 text-sm"
                {...register("title", { required: "Title is required" })} 
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Optional Sections - Removed location and mentions */}

            {/* Share Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Share
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page

