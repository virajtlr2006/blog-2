'use client'
import { profileAction } from '@/Action/authAction'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [profile, setProfile] = useState(null)

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

    return (
        <div>
            <h1>Thi is user profile</h1>
            {profile && <>
                {/* Displays information on display */}
                <p>{profile.name}</p>
                <p>{profile.email}</p>
            </>}
        </div>
    )
}

export default page
