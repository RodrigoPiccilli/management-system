"use client";

import { Popover, PopoverContent, PopoverTrigger, SettingsDialog } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Menu } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import router from "next/router";

export default function MobileMenu() {

    async function handleSignOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Sign out error:', error);
                alert('Failed to sign out. Please try again.');
                return;
            }

            router.push('/login');
        } catch (err) {
            console.error('Unexpected error during sign out:', err);
            alert('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <div className="bg-indigo-600 shadow-2xl">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="primary"
                        className="lg:hidden">
                        <Menu size={32} color="white" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-48 p-4">
                    <nav className="flex flex-col gap-3">
                        <Link href="/calendar">Calendar</Link>
                        <Link href="/nvr">NVR</Link>
                        <Link href="/homeowners">Homeowners</Link>
                        <Link href="/contractors">Contractors</Link>
                        <Link href="/repairs">Repairs</Link>
                        <Link href="/receivables">Receivables</Link>
                        <Link href="/payables">Payables</Link>
                        <Button variant="primary" onClick={handleSignOut}>Logout</Button>


                    </nav>
                </PopoverContent>
            </Popover>
        </div>
    );
}
