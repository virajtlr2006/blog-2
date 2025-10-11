'use client'
// Page: Home Feed — shows stories and a vertical feed of posts
// Data: fetched via allpostAction on mount, stored in allPost
import { allpostAction } from '@/Action/postAction'
import Singlepostcard from '@/components/SinglePostcard'
import React, { useEffect, useState } from 'react'

const page = () => {

  // Local state — posts & errors
  const [allPost, setallPost] = useState(null)
  const [errormsg, seterrormsg] = useState(null)

  // Effect — fetch posts on first render
  useEffect(() => {
    getallPost()
  }, [])

  // Action — call server action for all posts
  const getallPost = async () => {
    try {
      const all = await allpostAction()
      console.log(all)
      setallPost(all)
    } catch (error) {
      seterrormsg(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Layout — fixed sidebar offset + centered column */}
      {/* Main content area with Instagram-like layout */}
      <div className='pl-64 flex justify-center pt-6'>
        <div className='w-full max-w-md'>
          
          {/* Stories section */}
          <div className='bg-white rounded-lg border border-gray-200 mb-6 p-4'>
            {/* Horizontally scrollable list of story avatars */}
            <div className='flex gap-3 overflow-x-auto pb-2 hide-scrollbar'>
              {[
                { id: 1, name: 'Your story' },
                { id: 2, name: 'alex_dev' },
                { id: 3, name: 'sarah_photos' },
                { id: 4, name: 'mike_travels' },
                { id: 5, name: 'emma_designs' },
                { id: 6, name: 'john_fitness' },
                { id: 7, name: 'lisa_food' },
                { id: 8, name: 'david_music' }
              ].map((story) => (
                <div key={story.id} className='flex flex-col items-center min-w-fit'>
                  <div className='w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 hover:scale-105 transition-transform cursor-pointer'>
                    <div className='w-full h-full rounded-full bg-white p-0.5'>
                      <img 
                        src={`https://picsum.photos/60/60?random=${story.id}`} 
                        className='w-full h-full rounded-full object-cover'
                        alt={`${story.name} story`}
                      />
                    </div>
                  </div>
                  <span className='text-xs text-gray-600 mt-1 max-w-16 truncate'>{story.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Error message */}
          {errormsg && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-3 mb-4'>
              <p className='text-red-600 text-sm'>{errormsg}</p>
            </div>
          )}

          {/* Posts feed — render a Singlepostcard per post */}
          <div className='space-y-6 pb-6'>
            {allPost && allPost.map((p) => (
              <Singlepostcard
                key={p._id}
                id={p._id}
                title={p.title}
                author={p.email}
                image={p.image}
                description={p.description}
                like={Array.isArray(p.like) ? p.like : []}
                comments={Array.isArray(p.comments) ? p.comments : [
                  { email: 'viraj_tlr', msg: 'Queen of beauty 😍' },
                  { email: 'virajtlr2006', msg: 'Beautiful❤️' },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
