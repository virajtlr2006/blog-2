'use client'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='bg-green-900 fixed left-0 top-0 h-screen flex flex-col gap-3'>
      {[{"name":"Home","link":"/"},{"name":"New Post","link":"/post/new"},{"name":"Profile","link":"/profile"}].map((e)=> <a key={e.name} href={e.link}>
                {e.name}
            </a>)}
    </div>
  )
}

export default Sidebar
