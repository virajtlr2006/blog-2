'use client'
import { Grid, Settings, Heart, MessageCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { userallPostAction } from '@/Action/postAction'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const page = () => {
  // Local state — posts array, hover state for grid items
  const [userallpost, setUserAllPost] = useState([])
  const [hoveredPost, setHoveredPost] = useState(null)
  const { username, fullName, imageUrl, isLoaded } = useCurrentUser()

  // Effect — fetch user's posts when username is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const posts = await userallPostAction(username)
          setUserAllPost(posts)
        } catch (err) {
          console.error("Error fetching user posts:", err)
        }
      }
    }

    if (isLoaded) {
      fetchUserData()
    }
  }, [username, isLoaded])

  return (
    <div className="min-h-screen bg-gray-50 pl-64">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Profile</h1>
          <p className="text-sm text-gray-500 text-center mt-1">Your account and posts</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex justify-center md:justify-start">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile picture"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-100"
                />
              ) : (
                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h1 className="text-2xl font-light text-gray-900">{username}</h1>
                <div className="flex gap-2">
                  <button className="px-6 py-1.5 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    Edit profile
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors">
                    <Settings size={20} />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                <div className="text-center md:text-left">
                  <span className="font-semibold text-gray-900">{userallpost.length}</span>
                  <span className="text-gray-600 ml-1">posts</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold text-gray-900">142</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold text-gray-900">87</span>
                  <span className="text-gray-600 ml-1">following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <h2 className="font-semibold text-gray-900">{fullName}</h2>
                <p className="text-gray-600">Digital creator</p>
                <p className="text-gray-600">📍 Sharing moments from life</p>
                <p className="text-gray-600">✨ Love photography & travel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 border-t-2 border-gray-900">
                <Grid size={16} />
                POSTS
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="p-6">
            {userallpost.length > 0 ? (
              <div className="grid grid-cols-3 gap-1 md:gap-2">
                {userallpost.map((post, index) => (
                  <div
                    key={post._id}
                    className="relative aspect-square group cursor-pointer"
                    onMouseEnter={() => setHoveredPost(index)}
                    onMouseLeave={() => setHoveredPost(null)}
                    onClick={() => window.location.href = `/post/${post._id}`}
                  >
                    <img
                      src={post.image || `https://picsum.photos/400/400?random=${post._id}`}
                      alt={post.title || "Post"}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    
                    {/* Hover Overlay */}
                    {hoveredPost === index && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-sm transition-all duration-200">
                        <div className="flex items-center gap-6 text-white">
                          <div className="flex items-center gap-2">
                            <Heart size={20} className="fill-white" />
                            <span className="font-semibold">
                              {Array.isArray(post.like) ? post.like.length : 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle size={20} className="fill-white" />
                            <span className="font-semibold">
                              {Array.isArray(post.comments) ? post.comments.length : 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <Grid size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-2">No Posts Yet</h3>
                <p className="text-gray-500 mb-4">When you share photos, they'll appear on your profile.</p>
                <a
                  href="/post/new"
                  className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Share your first photo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
