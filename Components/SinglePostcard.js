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
              <img src={image} className='h-100 w-100 border-4 rounded-lg max-w-md object-cover ' />
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
          <div className=''>
           <Dialog>
              <DialogTrigger> <MessagesSquare onClick={() => setiscomment(!iscomment)} /></DialogTrigger>
              <DialogContent className='ml-120 h-100 w-70'>
                <DialogHeader>
                  <DialogTitle className='text-2xl font-bold'>Comments</DialogTitle>
                  <DialogDescription>
                     <div>
        
        {allcomment && <div className='flex flex-col gap-3'>
          <Input type='text' placeholder='comment' onChange={(e) => setusercomment(e.target.value)} />
          <Button onClick={() => onComment()}>Comment</Button>
          {allcomment.map((c) => <div className='border-2 rounded-lg pl-5 bg-gray-100'>
            <p className='font-bold'>{c.email}</p>
            <p>{c.msg}</p>
          </div>)}
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
              <DialogContent className='ml-80 mt-60 h-40 w-105'>
                <DialogHeader>
                  <DialogTitle className='font-bold'>Share your post</DialogTitle>
                  
                  <DialogDescription>
                    <div className='flex gap-2 items-center'>
                    <p>{`http://localhost:3000/post/${id}`}</p>
                    <Clipboard />
                    </div>
                    <div className='flex h-10 w-10 rounded-lg gap-8 mt-5'>
                    <img src='https://imgs.search.brave.com/mm-hPdGqieeJmtzX92vizsQekbTeHtmB7735QC3RLjY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi82LzZiL1do/YXRzQXBwLnN2Zy8y/NTBweC1XaGF0c0Fw/cC5zdmcucG5n' />
                    <img src='https://imgs.search.brave.com/Mxh8zByS8POeT70A1aN3UEh3FzmM-qF4bQM-qwAoz6M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk1L0lu/c3RhZ3JhbV9sb2dv/XzIwMjIuc3ZnLzI1/MHB4LUluc3RhZ3Jh/bV9sb2dvXzIwMjIu/c3ZnLnBuZw'/>
                     <img src='https://imgs.search.brave.com/FUWEcyC8ISzobxF7cnrKQSk_Uegq2QmN0YZ7tWQaoIU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9iL2I5LzIw/MjNfRmFjZWJvb2tf/aWNvbi5zdmcvMjUw/cHgtMjAyM19GYWNl/Ym9va19pY29uLnN2/Zy5wbmc'/>

                      <img src='https://imgs.search.brave.com/ff_MfeMIcP_VVvMEqBfHjRuH1IBKeHD_pO-8pKrY5ME/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Yy9jNC9TbmFwY2hh/dF9sb2dvLnN2Zy81/MTJweC1TbmFwY2hh/dF9sb2dvLnN2Zy5w/bmc'/>

                      <img src='https://imgs.search.brave.com/-esd6ZmJiTpcpxxjx3b03CrU6JLVeUa5gFWXAt7tIMY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi82LzYzL0Zh/Y2Vib29rX01lc3Nl/bmdlcl9sb2dvXzIw/MjUuc3ZnLzI1MHB4/LUZhY2Vib29rX01l/c3Nlbmdlcl9sb2dv/XzIwMjUuc3ZnLnBu/Zw'/>
                    </div>
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
