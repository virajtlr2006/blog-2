'use client'


import { deletepostAction, singlePostAction } from '@/Action/postAction'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCurrentUser } from '@/hooks/useCurrentUser'

const page = () => {
    // Local state — post data, like status
    const [showpost, setshowpost] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const { username } = useCurrentUser()
    const router = useRouter()
    const { id } = useParams()

    // Effect — fetch post data on mount
    useEffect(() => {
        singlePost()
    }, [])

    // Action — fetch single post by id
    const singlePost = async () => {
        const save = await singlePostAction(id)
        console.log(save);
        setshowpost(save)
    }

    // Action — navigate to edit page
    const editpost = async () => {
        router.replace(`./edit/${showpost._id}`)
    }
    
    // Action — delete post and redirect home
    const deletepost = async () => {
        await deletepostAction(id)
        router.replace("/")
    }

    // Auth check — user owns this post
    const isOwner = showpost && showpost.email === username

    return (
        <div className='min-h-screen bg-gray-50 pl-64'>
            <div className='max-w-2xl mx-auto pt-6'>
                {showpost && (
                    <>
                        {/* Page Header — back button + owner actions */}
                        <div className='flex items-center justify-between mb-6'>
                            <button 
                                onClick={() => router.back()}
                                className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
                            >
                                <ArrowLeft size={20} />
                                <span className='text-sm font-medium'>Back</span>
                            </button>
                            
                            {isOwner && (
                                <div className='flex items-center gap-2'>
                                    <Button
                                        onClick={editpost}
                                        variant="outline"
                                        size="sm"
                                        className='flex items-center gap-2'
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </Button>
                                    
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className='flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50'
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Delete Post</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this post? This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className='flex gap-3 pt-4'>
                                                <Button
                                                    onClick={deletepost}
                                                    className='flex-1 bg-red-600 hover:bg-red-700'
                                                >
                                                    Delete
                                                </Button>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className='flex-1'>
                                                        Cancel
                                                    </Button>
                                                </DialogTrigger>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </div>

                        {/* Post Card */}
                        <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
                            {/* Post Header */}
                            <div className='flex items-center justify-between p-4 border-b border-gray-100'>
                                <div className='flex items-center gap-3'>
                                    <img 
                                        src={`https://picsum.photos/40/40?random=${showpost._id}`}
                                        className='w-10 h-10 rounded-full object-cover'
                                        alt={showpost.email}
                                    />
                                    <div>
                                        <p className='font-semibold text-sm text-gray-900'>{showpost.email}</p>
                                        <p className='text-xs text-gray-500'>2 hours ago</p>
                                    </div>
                                </div>
                                <button className='text-gray-600 hover:text-gray-900'>
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Post Image */}
                            <div className='relative aspect-square'>
                                <img 
                                    src={showpost.image} 
                                    className='w-full h-full object-cover'
                                    alt={showpost.title}
                                />
                            </div>

                            {/* Post Actions */}
                            <div className='p-4'>
                                <div className='flex items-center justify-between mb-3'>
                                    <div className='flex items-center gap-4'>
                                        <button 
                                            onClick={() => setIsLiked(!isLiked)}
                                            className='hover:text-gray-600 transition-colors'
                                        >
                                            <Heart 
                                                size={24} 
                                                className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-900'} 
                                            />
                                        </button>
                                        
                                        <button className='hover:text-gray-600 transition-colors'>
                                            <MessageCircle size={24} className='text-gray-900' />
                                        </button>

                                        <button className='hover:text-gray-600 transition-colors'>
                                            <Send size={24} className='text-gray-900' />
                                        </button>
                                    </div>
                                    
                                    <button className='hover:text-gray-600 transition-colors'>
                                        <Bookmark size={24} className='text-gray-900' />
                                    </button>
                                </div>

                                {/* Likes */}
                                <div className='mb-3'>
                                    <p className='font-semibold text-sm text-gray-900'>
                                        {showpost.like?.length || 0} {(showpost.like?.length || 0) === 1 ? 'like' : 'likes'}
                                    </p>
                                </div>

                                {/* Caption */}
                                <div className='mb-3'>
                                    <p className='text-sm'>
                                        <span className='font-semibold text-gray-900 mr-2'>{showpost.email}</span>
                                        <span className='text-gray-900'>{showpost.description}</span>
                                    </p>
                                </div>

                                {/* Title */}
                                {showpost.title && (
                                    <div className='mb-3'>
                                        <h2 className='font-semibold text-lg text-gray-900'>{showpost.title}</h2>
                                    </div>
                                )}

                                {/* Comments Preview */}
                                {showpost.comments && showpost.comments.length > 0 && (
                                    <div className='space-y-1 mb-3'>
                                        <button className='text-gray-500 text-sm hover:text-gray-700'>
                                            View all {showpost.comments.length} comments
                                        </button>
                                        {showpost.comments.slice(0, 2).map((comment, index) => (
                                            <div key={index} className='text-sm'>
                                                <span className='font-semibold mr-2'>{comment.email}</span>
                                                <span className='text-gray-900'>{comment.msg}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Timestamp */}
                                <div className='mb-3'>
                                    <p className='text-xs text-gray-500 uppercase tracking-wide'>2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default page
