"use client"

import {
    Button,
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui"


import * as React from "react"
import Link from "next/link"
import { invalidateCache } from "@/lib/cache"
import supabase from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

const JOB_NAME_FILTER = 'jobNameFilter'


export function Navigation({ activeTab }: { activeTab?: string }) {

    const router = useRouter();

    const removeFilter = () => {
        invalidateCache(JOB_NAME_FILTER);
    }

    const cleanUpCache = () => {
        invalidateCache('homeowner_jobs_cache');
        invalidateCache('nvr_jobs_cache');
        invalidateCache(JOB_NAME_FILTER);
    }

    async function handleSignOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Sign out error:', error);
                alert('Failed to sign out. Please try again.');
                return;
            }

            cleanUpCache();
            router.push('/login');
        } catch (err) {
            console.error('Unexpected error during sign out:', err);
            alert('An unexpected error occurred. Please try again.');
        }
    }


    return (
        <div className="relative">

            <NavigationMenu className="h-15 bg-slate-100 text-slate-700 min-w-full flex justify-start pl-17 border-b-2 border-indigo-500 shadow-lg rounded-lg">
                <NavigationMenuList className="flex gap-5">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="cursor-pointer">
                            <Link
                                href="/calendar"
                                className={`navigation-title ${activeTab === "calendar" ? "text-indigo-600 font-bold" : ""}`}
                                onClick={removeFilter}>
                                Calendar
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="cursor-pointer">
                            <Link
                                href="/nvr"
                                className={`navigation-title ${activeTab === "nvr" ? "text-indigo-600 font-bold" : ""}`}
                                onClick={removeFilter}>
                                NVR
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="cursor-pointer">
                            <Link
                                href="/homeowners"
                                className={`navigation-title ${activeTab === "homeowners" ? "text-indigo-600 font-bold" : ""}`}
                                onClick={removeFilter}>
                                Homeowners
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="cursor-pointer">
                            <Link
                                href="/receivables"
                                className={`navigation-title ${activeTab === "receivables" ? "text-indigo-600 font-bold" : ""}`}
                                onClick={removeFilter}>
                                Receivables
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="cursor-pointer">
                            <Link
                                href="/payables"
                                className={`navigation-title ${activeTab === "payables" ? "text-indigo-600 font-bold" : ""}`}
                                onClick={removeFilter}>
                                Payables
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <Button variant="primary" className="absolute top-[0.75rem] right-[1rem]" onClick={handleSignOut}>Logout</Button>

        </div >

    );
}
