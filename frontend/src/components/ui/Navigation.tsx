"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"


import * as React from "react"
import Link from "next/link"


export function Navigation() {

    return (
        // <Tabs
        //     defaultValue="nvr"
        //     className="bg-slate-800 py-2 text-white"
        //     onValueChange={(value: string) => {
        //         const route = tabRoutes[value as keyof typeof tabRoutes];
        //         if (route) router.push(route);
        //     }}
        // >
        //     <TabsList className="h-15 bg-slate-100 text-slate-700" >
        //         <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="nvr">NVR</TabsTrigger>
        //         <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="homeowners">Homeowners</TabsTrigger>
        //         <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="payables">Payables</TabsTrigger>
        //     </TabsList>
        // </Tabs>

        <NavigationMenu className="h-15 bg-slate-100 text-slate-700">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link href="/nvr">NVR</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className="px-10">
                    <NavigationMenuLink asChild className="cursor-pointer">
                        <Link href="/homeowners">Homeowners</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>


        
    );
}


// export function NavigationMenuDemo() {
//   return (
//     <NavigationMenu viewport={false}>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Home</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
//                     href="/"
//                   >
//                     <div className="mt-4 mb-2 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-muted-foreground text-sm leading-tight">
//                       Beautifully designed components built with Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//             <Link href="/docs">Docs</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>List</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[300px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">
//                     <div className="font-medium">Components</div>
//                     <div className="text-muted-foreground">
//                       Browse all components in the library.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">
//                     <div className="font-medium">Documentation</div>
//                     <div className="text-muted-foreground">
//                       Learn how to use the library.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">
//                     <div className="font-medium">Blog</div>
//                     <div className="text-muted-foreground">
//                       Read our latest blog posts.
//                     </div>
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Components</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Documentation</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Blocks</Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleHelpIcon />
//                     Backlog
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleIcon />
//                     To Do
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleCheckIcon />
//                     Done
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }
