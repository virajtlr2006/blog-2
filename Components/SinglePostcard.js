'use client'
import { likeAction } from '@/Action/postAction'
import { ChefHatIcon } from 'lucide-react'
import { HeartIcon } from 'lucide-react'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Singlepostcard = ({ id, title, image, description,like,comments}) => {

const [likeCount, setlikeCount] = useState(0)
const [islike , setislike] = useState(false)
const [iscomment , setiscomment] = useState(false)

  useEffect(() => {
    // console.log(like);
    setlikeCount(like.length)
    const email = localStorage.getItem("email")
    if(like.includes(email) == true){
      setislike(true)
    }
    
  }, [])

const onlike = async () => {
  setislike(!islike)
  const email = localStorage.getItem("email")
  await likeAction(email,id)

  if (islike == true) {
    setlikeCount(likeCount-1)
  } else {
        setlikeCount(likeCount+1)

  }
}

  return (
    <div>
      <a key={id} href={`/post/${id}`}>
        <div key={id}>
          <p>{title}</p>
          <img src={image} />
          <p>{description}</p>

        </div>
      </a>
      {
        islike ?<HeartIcon onClick={onlike} color='red' fill='red'/> :<HeartIcon onClick={onlike} /> 
      }
      
      {likeCount}
      <ChefHatIcon onClick={()=> setiscomment(!iscomment)}/>
      {iscomment && <div>
        Comments
        {comments && <div>
          {comments.map((c)=> <>
          <p>{c.email}</p>
          <p>{c.msg}</p>
          </>)}
          </div>}
      </div>}
    </div>

  )
}

export default Singlepostcard
