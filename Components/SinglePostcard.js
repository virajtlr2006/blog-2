'use client'
import { commentAction, likeAction } from '@/Action/postAction'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Share } from 'lucide-react'
import { ChefHatIcon } from 'lucide-react'
import { HeartIcon } from 'lucide-react'
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Clipboard } from 'lucide-react'
import { MessagesSquare } from 'lucide-react'
import { useUser } from '@clerk/nextjs'


const Singlepostcard = ({ id, title, image, description, like, comments }) => {

  const [likeCount, setlikeCount] = useState(0)
  const [islike, setislike] = useState(false)
  const [iscomment, setiscomment] = useState(false)
  const [usercomment, setusercomment] = useState(null)
  const [allcomment, setallcomment] = useState(null)
  const [userid, setuserid] = useState(null)
  const user = useUser()

      useEffect(() => {
        if (user.user) {
            setuserid(user.user.username);

        }
    }, [user])


  useEffect(() => {
    // console.log(like);
    setlikeCount(like.length)
    const email = userid
    if (like.includes(email) == true) {
      setislike(true)
    }
    setallcomment(comments)
  }, [])

  const onlike = async () => {
    setislike(!islike)
    const email = userid
    await likeAction(email, id)

    if (islike == true) {
      setlikeCount(likeCount - 1)
    } else {
      setlikeCount(likeCount + 1)

    }
  }

  const onComment = async () => {
    const email = userid
    setallcomment([...allcomment, { email, "msg": usercomment }])
    await commentAction(usercomment, email, id)
  }
  return (
    <div className='border-none'>
      <Card className=' h-full border-none w-150 p-0 overflow-hidden mx-auto'>
        <CardHeader>
          <div className='flex mt-5  gap-3 items-center'>
            <Avatar className='border-2 border-green-600 rounded-full'>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <CardTitle><p>{title}</p></CardTitle>
          </div>
          <CardDescription><p className='ml-3 mt-2'>{description}</p></CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center p-4 text-center'>
          <div>
            <a key={id} href={`/post/${id}`}>
              <img src={image} className='border-4 rounded-lg w-full max-w-md object-cover ' />
            </a>
          </div>
        </CardContent>
        <hr />
        <CardFooter className='justify-around pb-5 ' >
          <div className='flex'>
            {
              islike ? <HeartIcon className='' onClick={onlike} color='red' fill='red' /> : <HeartIcon onClick={onlike} />
            }
            {likeCount}
          </div>
          <div>
           <Dialog>
              <DialogTrigger> <MessagesSquare onClick={() => setiscomment(!iscomment)} /></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>comment</DialogTitle>
                  <DialogDescription>
                     <div>
        Comments
        {allcomment && <div>
          <Input type='text' placeholder='comment' onChange={(e) => setusercomment(e.target.value)} />
          <Button onClick={() => onComment()} />
          {allcomment.map((c) => <>
            <p>{c.email}</p>
            <p>{c.msg}</p>
          </>)}
        </div>}
      </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
   
          </div>
          <div>
            <Dialog>
              <DialogTrigger><Share /></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share your post</DialogTitle>
                  <DialogDescription>
                    <p>{`http://localhost:3000/post/${id}`}</p>
                    <Clipboard />
                    <img className='h-10 w-10' src="data:image/jpeg;base64,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" />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
  
          </div>
        </CardFooter>
      </Card>



    </div>

  )
}

export default Singlepostcard
