'use client'
import { allpostAction } from '@/Action/postAction'
import Singlepostcard from '@/Components/SinglePostcard'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [allPost, setallPost] = useState(null)
  const [errormsg, seterrormsg] = useState(null)

  useEffect(() => {
    getallPost()


  }, [])


  const getallPost = async () => {
    try {
      const all = await allpostAction()
      console.log(all);

      setallPost(all)
    } catch (error) {
      seterrormsg(error.message)
    }

  }

  return (
    <div className='flex flex-col gap-5 ml-40 '>
      {allPost && allPost.map((p) =>
        <Singlepostcard key={p._id} id={p._id} title={p.email} email={p.title} image={p.image} description={p.description} like={p.like} comments={[
          {
            "email": "viraj_tlr",
            "msg": "Queen of beauty 😍"
          },
          {
            "email": "virajtlr2006",
            "msg": "Beautiful❤️"
          }
        ]} />

      )}
    </div>
  )
}

export default page
