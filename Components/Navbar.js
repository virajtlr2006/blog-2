import React from 'react'

const navbar = () => {
    return (
        <div className='flex gap-3'>
            <a href='/post/new'>
                New
            </a>
            <a href='/'>
                home
            </a>
            <a href='/post/mypost'>
                My Posts
            </a>
        </div>
    )
}

export default navbar
