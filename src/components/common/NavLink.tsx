"use client"; // as we are using usePathname which is a client specific feature so we have too convert it into client component

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
export function NavLink({
    href ,children,className
}:{
    href : string,
    children:React.ReactNode,
    className?:string
}){
    const pathname = usePathname() //gives the current path of the user
    const isActive = pathname === href || (href!=='/' && pathname.startsWith(href))
    return(
        <Link href={href} 
        className={cn(
            "transition-colors text-sm duration-200 text-gray-900 hover:text-rose-500",
            className,
            isActive && 'text-rose-500' //if we are in sign page so sign in in header should have text-rose-500 color to indicate it is the path they currently at 
        )}
        
        >
            {children}
        </Link>
    )
}