'use client'
import { allpostAction } from '@/Action/postAction'
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
      setallPost(all)
    } catch (error) {
      seterrormsg(error.message)
    }

  }

  return (
    <div >
      {allPost && allPost.map((p) =>
      <a key={p._id} href={`/post/${p._id}`}>
        <div key={p._id}>
          <p>{p.title}</p>
          <img src={p.image} />
          <p>{p.description}</p>
          {errormsg && <>
            <p>{errormsg}</p>
          </>}
        </div>
        </a>
      )}
    </div>
  )
}

export default page
