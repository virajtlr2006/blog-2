'use client'
import { useForm } from "react-hook-form"
import React from 'react'
import { signupAction } from "@/Action/authAction"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'


const page = () => {

    return (
        <div className="pl-50">
<SignedOut>
    <SignUpButton >Sign Up</SignUpButton>
</SignedOut>
<SignedIn>
    <UserButton/>
</SignedIn>
        </div>
    )
}

export default page
