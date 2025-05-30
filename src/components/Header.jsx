import React from 'react'
import { ModeToggle } from './themetoggle'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUp, SignUpButton, UserButton } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, Home, LayoutDashboard, MessageCircleMore, PenBox, StarsIcon } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

async function Header() {
    await checkUser();

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* <Link href="/"> */}
                <Image
                    src={"/logo.png"}
                    alt="DreamAlign Logo"
                    width={900}
                    height={900}
                    className="h-40 -ml-4 md:ml-0 py-1 w-auto object-contain"
                />
                {/* </Link> */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                className="hidden md:inline-flex items-center gap-2"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Industry Insights
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <LayoutDashboard className="h-4 w-4" />
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <StarsIcon className="h-4 w-4" />
                                    <span className="hidden md:block">Growth Tools</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/resume" className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Build Resume
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/ai-cover-letter"
                                        className="flex items-center gap-2"
                                    >
                                        <PenBox className="h-4 w-4" />
                                        Cover Letter
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/interview" className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" />
                                        Interview Prep
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/chat" className="flex items-center gap-2">
                                        <MessageCircleMore className="h-4 w-4" />
                                        Career Coaching
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline" className="cursor-pointer">Sign In</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold",
                                },
                            }}
                        // afterSignOutUrl="/"
                        // signOutCallback={()=> { router.replace("/"); }}
                        />
                    </SignedIn>


                    <ModeToggle />
                </div>
            </nav>
        </header >
    )
}

export default Header