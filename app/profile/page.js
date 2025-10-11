'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { userallPostAction } from '@/Action/postAction' // Make sure this function exists and works
import { Button } from '@/Components/ui/button'

const page = () => {
  const [fullName, setFullName] = useState(null)
  const [username, setUsername] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [userallpost, setUserAllPost] = useState([])
  const user = useUser()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user.user) {
        const username = user.user.username
        const fullName = user.user.fullName
        const imageUrl = user.user.imageUrl

        setUsername(username)
        setFullName(fullName)
        setImageUrl(imageUrl)

        try {
          const posts = await userallPostAction(username)
          setUserAllPost(posts)
        } catch (err) {
          console.error("Error fetching user posts:", err)
        }
      }
    }

    fetchUserData()
  }, [user])

  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-4 py-8 ml-55 mt-10">
      <Card className="w-full max-w-4xl border-none">
        <CardHeader className="flex flex-row items-center gap-10">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="User avatar"
              className="rounded-full h-32 w-32 object-cover border"
            />
          ) : (
            <Skeleton className="h-32 w-32 rounded-full" />
          )}

          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl font-semibold">{username}</CardTitle>
            <p className="text-gray-600">{fullName}</p>

            <div className="flex gap-6 text-sm mt-2">
              <p><span className="font-semibold">{userallpost.length}</span> posts</p>
              <p><span className="font-semibold">2</span> followers</p>
              <p><span className="font-semibold">2</span> following</p>
            </div>
        
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {userallpost.map((post) => (
              <a key={post._id} href={`/post/${post._id}`}>
                <img
                  src={post.image}
                  alt={post.title || "User post"}
                  className="w-full h-60  object-cover rounded-md"
                />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page