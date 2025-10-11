'use client'
import { commentAction, likeAction } from '@/Action/postAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCurrentUser } from '@/hooks/useCurrentUser'

const Singlepostcard = ({ id, title, author, image, description, like, comments }) => {
  // State — like count, current like status, comment input & list
  const [likeCount, setlikeCount] = useState(0)
  const [islike, setislike] = useState(false)
  const [usercomment, setusercomment] = useState('')
  const [allcomment, setallcomment] = useState([])
  const [showAllComments, setShowAllComments] = useState(false)
  const { username } = useCurrentUser()

  // Init — sync like/comment props into local state
  useEffect(() => {
    if (like) {
      setlikeCount(Array.isArray(like) ? like.length : 0)
      if (like.includes(username)) {
        setislike(true)
      }
    }
    if (comments) {
      setallcomment(Array.isArray(comments) ? comments : [])
    }
  }, [like, comments, username])

  // Action — toggle like and persist
  const onlike = async () => {
    setislike(!islike)
    await likeAction(username, id)

    if (islike) {
      setlikeCount(likeCount - 1)
    } else {
      setlikeCount(likeCount + 1)
    }
  }

  // Action — add a new comment and persist
  const onComment = async () => {
    if (!usercomment.trim()) return
    const newComment = { email: username, msg: usercomment }
    setallcomment([...allcomment, newComment])
    await commentAction(usercomment, username, id)
    setusercomment('')
  }

  // UX — submit on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onComment()
    }
  }

  return (
    <div className='bg-white border border-gray-200 rounded-lg overflow-hidden w-full shadow-sm'>
      {/* Post Header */}
      <div className='flex items-center justify-between p-4'>          <div className='flex items-center gap-3'>
            <img 
              src={`https://picsum.photos/40/40?random=${id}`} 
              className='w-10 h-10 rounded-full object-cover'
              alt={author}
            />
            <div>
              <p className='font-semibold text-sm text-gray-900'>{author || title}</p>
              <p className='text-xs text-gray-500'>2 hours ago</p>
            </div>
          </div>
        <button className='text-gray-600 hover:text-gray-900'>
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <div className='relative aspect-square'>
        <a href={`/post/${id}`}>
          <img 
            src={image || `https://picsum.photos/600/600?random=${id}`} 
            className='w-full h-full object-cover cursor-pointer'
            alt={title}
          />
        </a>
      </div>

      {/* Post Actions */}
      <div className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-4'>
            {/* Like button */}
            <button 
              onClick={onlike}
              className='hover:text-gray-600 transition-colors'
            >
              <Heart 
                size={24} 
                className={islike ? 'fill-red-500 text-red-500' : 'text-gray-900'} 
              />
            </button>
            
            {/* Comments dialog trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <button className='hover:text-gray-600 transition-colors'>
                  <MessageCircle size={24} className='text-gray-900' />
                </button>
              </DialogTrigger>
              {/* Comments dialog */}
              <DialogContent className='max-w-2xl max-h-[80vh] p-0'>
                <div className='h-[70vh] flex flex-col'>
                  {/* Header */}
                  <div className='flex items-center justify-between p-4 border-b'>
                    <div className='flex items-center gap-3'>
                      <img 
                        src={`https://picsum.photos/40/40?random=${id}`} 
                        className='w-10 h-10 rounded-full object-cover'
                        alt={author}
                      />
                      <div>
                        <p className='font-semibold text-sm'>{author || title}</p>
                        <p className='text-xs text-gray-500'>2 hours ago</p>
                      </div>
                    </div>
                    <p className='text-sm font-semibold text-gray-900'>Comments</p>
                  </div>

                  {/* Post description */}
                  <div className='p-4 border-b bg-gray-50'>
                    <div className='flex gap-3'>
                      <img 
                        src={`https://picsum.photos/40/40?random=${id}`} 
                        className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                        alt={author}
                      />
                      <div className='flex-1'>
                        <div className='bg-white rounded-lg p-3 shadow-sm'>
                          <span className='font-semibold text-sm mr-2'>{author || title}</span>
                          <span className='text-sm text-gray-900'>{description}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className='flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar'>
                    {allcomment.map((comment, index) => (
                      <div key={index} className='flex gap-3 group'>
                        <img 
                          src={`https://picsum.photos/32/32?random=${comment.email}`} 
                          className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                          alt={comment.email}
                        />
                        <div className='flex-1'>
                          <div className='bg-gray-50 rounded-2xl px-3 py-2 hover:bg-gray-100 transition-colors'>
                            <span className='font-semibold text-sm text-gray-900 hover:text-blue-600 cursor-pointer mr-2'>
                              {comment.email}
                            </span>
                            <span className='text-sm text-gray-900 break-words'>{comment.msg}</span>
                          </div>
                          <div className='flex items-center gap-4 mt-1 ml-3'>
                            <span className='text-xs text-gray-500'>2m</span>
                            <button className='text-xs text-gray-500 font-semibold hover:text-gray-700'>
                              Like
                            </button>
                            <button className='text-xs text-gray-500 font-semibold hover:text-gray-700'>
                              Reply
                            </button>
                          </div>
                        </div>
                        <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all self-start mt-2'>
                          <Heart size={12} className='hover:fill-current' />
                        </button>
                      </div>
                    ))}
                    {allcomment.length === 0 && (
                      <div className='text-center py-12'>
                        <MessageCircle size={48} className='mx-auto text-gray-300 mb-3' />
                        <p className='text-gray-500 text-sm font-medium'>No comments yet</p>
                        <p className='text-gray-400 text-xs'>Be the first to comment</p>
                      </div>
                    )}
                  </div>

                  {/* Add comment */}
                  <div className='border-t bg-white p-4'>
                    <div className='flex items-center gap-3'>
                      <img 
                        src={`https://picsum.photos/32/32?random=current-user`} 
                        className='w-8 h-8 rounded-full object-cover'
                        alt="Your profile"
                      />
                      <div className='flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2'>
                        <Input
                          value={usercomment}
                          onChange={(e) => setusercomment(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder='Write a comment...'
                          className='flex-1 border-none focus:ring-0 text-sm bg-transparent px-0 placeholder:text-gray-400'
                        />
                      </div>
                      <button 
                        onClick={onComment}
                        disabled={!usercomment.trim()}
                        className='text-blue-500 font-semibold text-sm disabled:text-gray-300 hover:text-blue-700 transition-colors disabled:cursor-not-allowed px-3 py-1 rounded-full hover:bg-blue-50'
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Share dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className='hover:text-gray-600 transition-colors'>
                  <Send size={24} className='text-gray-900' />
                </button>
              </DialogTrigger>
              <DialogContent className='max-w-md p-6'>
                <DialogHeader>
                  <DialogTitle className='text-lg font-semibold text-gray-900'>Share Post</DialogTitle>
                </DialogHeader>
                <div className='space-y-4 mt-4'>
                  <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                    <span className='text-sm text-gray-700 flex-1'>
                      {`${window.location.origin}/post/${id}`}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/post/${id}`)
                        alert('Link copied to clipboard!')
                      }}
                      className='text-blue-500 text-sm font-semibold hover:text-blue-700'
                    >
                      Copy
                    </button>
                  </div>
                  
                  <div className='grid grid-cols-4 gap-4'>
                    <button className='flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                      <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>W</span>
                      </div>
                      <span className='text-xs text-gray-600'>WhatsApp</span>
                    </button>
                    
                    <button className='flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                      <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>F</span>
                      </div>
                      <span className='text-xs text-gray-600'>Facebook</span>
                    </button>
                    
                    <button className='flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                      <div className='w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>T</span>
                      </div>
                      <span className='text-xs text-gray-600'>Twitter</span>
                    </button>
                    
                    <button className='flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                      <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>I</span>
                      </div>
                      <span className='text-xs text-gray-600'>Instagram</span>
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Save/bookmark button */}
          <button className='hover:text-gray-600 transition-colors'>
            <Bookmark size={24} className='text-gray-900' />
          </button>
        </div>

        {/* Likes */}
        <div className='mb-2'>
          {likeCount > 0 && (
            <p className='font-semibold text-sm text-gray-900'>
              {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </p>
          )}
        </div>

        {/* Caption */}
        <div className='mb-2'>
          <span className='font-semibold text-sm text-gray-900 mr-2 hover:text-gray-700 cursor-pointer'>
            {author || title}
          </span>
          <span className='text-sm text-gray-900'>{description}</span>
        </div>

        {/* Timestamp */}
        <div className='mb-2'>
          <p className='text-xs text-gray-500 uppercase tracking-wide'>2 hours ago</p>
        </div>

        {/* View comments */}
        {allcomment.length > 0 && (
          <button 
            onClick={() => setShowAllComments(!showAllComments)}
            className='text-gray-500 text-sm mb-2 hover:text-gray-700'
          >
            {showAllComments ? 'Hide comments' : `View all ${allcomment.length} comments`}
          </button>
        )}

        {/* Collapsed comments (first few) */}
        {showAllComments && (
          <div className='space-y-2 mb-3'>
            {allcomment.slice(0, 3).map((comment, index) => (
              <div key={index} className='text-sm flex gap-2'>
                <span className='font-semibold text-gray-900 hover:text-gray-700 cursor-pointer'>
                  {comment.email}
                </span>
                <span className='text-gray-900 flex-1'>{comment.msg}</span>
                <button className='text-gray-400 hover:text-red-500 ml-auto'>
                  <Heart size={12} className='hover:fill-current' />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Inline add comment */}
        <div className='flex items-center gap-3 pt-3 border-t border-gray-100'>
          <Input
            value={usercomment}
            onChange={(e) => setusercomment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Add a comment...'
            className='flex-1 border-none focus:ring-0 text-sm bg-transparent px-0 placeholder:text-gray-400'
          />
          <button 
            onClick={onComment}
            disabled={!usercomment.trim()}
            className='text-blue-500 font-semibold text-sm disabled:text-gray-300 hover:text-blue-700 transition-colors disabled:cursor-not-allowed'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Singlepostcard
