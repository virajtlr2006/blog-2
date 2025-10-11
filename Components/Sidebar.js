'use client'

import { Plus } from 'lucide-react'
import { CircleUserRound } from 'lucide-react'
import { House } from 'lucide-react'
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { UserRoundPlus } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { name: 'Home', link: '/', icon: <House className='text-black' /> },
    { name: 'New Post', link: '/post/new', icon: <Plus className='text-black' /> },
    { name: 'Profile', link: '/profile', icon: <CircleUserRound className='text-black' /> },
  ]

  return (
    <div className='bg-gray-50 fixed pl-10 left-0 top-0 h-screen flex flex-col gap-5 w-55 p-4 text-black border-r-2 font-semibold'>
      <h1 className='text-3xl font-bold'>Nexora</h1>
      {navItems.map((e) => (
        <a key={e.name} href={e.link} className='px-5 py-1 flex items-center gap-2 hover:bg-blue-100 rounded-3xl'>
          {e.icon}
          {e.name}
        </a>
      ))}
      <SignedOut>
       <SignUpButton className='px-6 py-1 flex items-center gap-2 hover:bg-blue-100 rounded-3xl' >
        Sign Up
        </SignUpButton>
       </SignedOut>
       <SignedIn>
        <a className='px-5 py-1 flex items-center gap-2 hover:bg-blue-100 rounded-3xl'>
          <UserButton />
          Edit profile
        </a>
       </SignedIn>
    </div>
  )
}

export default Sidebar