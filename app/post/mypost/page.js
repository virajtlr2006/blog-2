'use client'
// Page: My Posts — show current user's posts in grid layout
// Data: user posts fetched by username from centralized hook
import { userallPostAction } from '@/Action/postAction'
import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const page = () => {

    // Local state — user's posts array
    const [userallpost, setuserallpost] = useState(null)
    const { username, isLoaded } = useCurrentUser()

    // Effect — fetch posts when user data is loaded
    useEffect(() => {
        const myposts = async () => {
            try {
                const post = await userallPostAction(username)
                setuserallpost(post)
            } catch (e) {
                console.error('Failed to load posts', e)
            }
        }
        if (isLoaded && username) {
            myposts()
        }
    }, [isLoaded, username])

    return (
        <div className='min-h-screen bg-gray-50 pl-64'>
            <div className='max-w-4xl mx-auto pt-6 px-4'>
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">My Posts</h1>
                    <p className="text-sm text-gray-500 text-center mt-1">All your published posts</p>
                </div>

                {/* Posts Grid — 3 columns, click to view single post */}
                <div className='grid grid-cols-3 gap-2 md:gap-3'>
                    {userallpost && userallpost.map((p) => (
                        <a key={p._id} href={`/post/${p._id}`} className='aspect-square overflow-hidden group rounded-sm'>
                            <img src={p.image} alt={p.title || 'Post'} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200' />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
