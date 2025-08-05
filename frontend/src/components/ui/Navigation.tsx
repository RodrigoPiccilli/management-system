"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui"


import * as React from "react"
import Link from "next/link"


export function Navigation({ activeTab }: { activeTab?: string }) {

    return (

        <NavigationMenu className="h-15 bg-slate-100 text-slate-700 min-w-full flex justify-start pl-17 border-b-2 border-indigo-500 shadow-lg rounded-lg">
            <NavigationMenuList className="flex gap-5">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link
                            href="/calendar"
                            className={`navigation-title ${activeTab === "calendar" ? "text-indigo-600 font-bold" : ""}`}>
                            Calendar
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link
                            href="/nvr"
                            className={`navigation-title ${activeTab === "nvr" ? "text-indigo-600 font-bold" : ""}`}>
                            NVR
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link
                            href="/homeowners"
                            className={`navigation-title ${activeTab === "homeowners" ? "text-indigo-600 font-bold" : ""}`}>
                            Homeowners
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link
                            href="/receivables"
                            className={`navigation-title ${activeTab === "receivables" ? "text-indigo-600 font-bold" : ""}`}>
                            Receivables
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link
                            href="/payables"
                            className={`navigation-title ${activeTab === "payables" ? "text-indigo-600 font-bold" : ""}`}>
                            Payables
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>



    );
}
