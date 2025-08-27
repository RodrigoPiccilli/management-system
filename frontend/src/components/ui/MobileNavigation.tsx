"use client";

import { Popover, PopoverContent, PopoverTrigger, SettingsDialog } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function MobileMenu() {

    return (
        <div className="bg-indigo-600 shadow-2xl">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="primary"
                        className="lg:hidden">
                        <Menu size={32} color="white"/>
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
                        <Button variant="primary" className="">Logout</Button>


                    </nav>
                </PopoverContent>
            </Popover>
        </div>
    );
}
