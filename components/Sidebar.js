'use client'
import { Plus, Home, Search, Compass, Heart, MessageCircle, User } from 'lucide-react'
import React from 'react'
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Sidebar = () => {
  // Nav config — name + href + icon for each item
  const navItems = [
    { name: 'Home', link: '/', icon: <Home size={24} /> },
    { name: 'Search', link: '#', icon: <Search size={24} /> },
    { name: 'Explore', link: '#', icon: <Compass size={24} /> },
    { name: 'Messages', link: '#', icon: <MessageCircle size={24} /> },
    { name: 'Notifications', link: '#', icon: <Heart size={24} /> },
    { name: 'Create', link: '/post/new', icon: <Plus size={24} /> },
    { name: 'Profile', link: '/profile', icon: <User size={24} /> },
  ]

  return (
    <div className='bg-white fixed left-0 top-0 h-screen flex flex-col border-r border-gray-200 z-50 w-64'>
      {/* Branding */}
      <div className='p-6 border-b border-gray-200'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent'>
          Nexora
        </h1>
      </div>

      {/* Navigation */}
      <nav className='flex-1 pt-4'>
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href={item.link} 
            className='flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors group'
          >
            <div className='text-gray-700 group-hover:scale-105 transition-transform'>
              {item.icon}
            </div>
            <span className='font-medium text-gray-900'>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Auth — show sign up when signed out; avatar when signed in */}
      <div className='border-t border-gray-200 p-4'>
        <SignedOut>
          <div className='mb-2'>
            <SignUpButton mode="modal">
              <button className='flex items-center gap-4 w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors'>
                <User size={20} />
                <span className='font-medium'>Sign Up</span>
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg'>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
            <div className='flex-1'>
              <span className='text-sm font-medium text-gray-900'>Profile</span>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default Sidebar