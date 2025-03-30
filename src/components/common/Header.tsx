
import { FileText } from 'lucide-react';
import { NavLink } from "./NavLink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./PlanBadge";
export default function Header(){
    const isLoggedIn = false;
    return (
        <nav className="flex justify-between items-center py-4 lg:px-8 px-2 mx-auto w-full">
            <div className="flex lg:flex-1">
                <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
                    <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform duration-200 ease-in-out"/>
                    <span className="font-extrabold lg:text-xl text-gray-900">PDFreakout</span>
                </NavLink>
            </div>
            <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
                <NavLink href="/#Pricing">Pricing</NavLink>
                <SignedIn>
                    <NavLink href="/dashboard">Your Summaries</NavLink>{/*  this will only be shown if user is SignedIn */}
                </SignedIn>
                
            </div>
            <div className="flex lg:justify-end lg:flex-1">
                <SignedIn>
                    <div className="flex gap-2 items-center">
                        <NavLink href="/upload">Upload a PDF</NavLink>
                        <PlanBadge />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </SignedIn>
                <SignedOut>
                    <div>
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </div> {/*This will only be shown if user is signed out*/}
                </SignedOut>
                
            </div>
        </nav>
    )
}