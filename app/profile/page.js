'use client'
import { profileAction } from '@/Action/authAction'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [profile, setProfile] = useState(null)

    const router = useRouter()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            const email = localStorage.getItem("email") //Retrive email from localstorage
            const user = await profileAction(email); //Send data to backend
            setProfile(user);
        } catch (error) {
            alert("SignUp first")
        }
    }

    const logOut = async () => {
        await localStorage.removeItem("email")
        alert("Log Out Successful")
        router.replace("/login")
    }

    return (
        <div>
            <h1>Thi is user profile</h1>
            {profile && <>
                {/* Displays information on display */}
                <p>{profile.name}</p>
                <p>{profile.email}</p>
                <a onClick={logOut}>Log Out</a>
                <a>Edit Profile</a>
            </>}
        </div>
    )
}

export default page
