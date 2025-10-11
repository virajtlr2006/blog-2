"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'


const page = () => {

    const [fullName, setFullName] = useState(null)
    const [username, setUsername] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const user = useUser()
    if (!user) {
        return <div className='pl-59'>loading</div>
    }
    useEffect(() => {
        if (user.user) {
            // console.log(user.user);

            setFullName(user.user.fullName);
            setUsername(user.user.username);
            setImageUrl(user.user.imageUrl);
        }


    }, [user])

    return (
        <div className='pl-59'>
            {imageUrl && <>
                <img className='rounded-full h-30 w-30' src={imageUrl} />
            </>}
            {username && <>
                <p>{username}</p>
            </>}
            {fullName && <>
                <p>{fullName}</p>
            </>}

        </div>
    )
}

export default page
