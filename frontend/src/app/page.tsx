"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingPage } from '@/components/ui'

/**
 * Home page: immediately redirects users to the login page while showing a loading screen.
 */
export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/login')
    }, [router])

    return <LoadingPage />
}