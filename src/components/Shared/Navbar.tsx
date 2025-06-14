'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { RiMenu2Fill } from "react-icons/ri";
import { useTheme } from "next-themes";
import { useAuth } from "@/Provider/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



const Navbar = () => {
    const { setTheme } = useTheme()
    const currentTheme = localStorage.getItem('theme')
    if (!currentTheme) return setTheme('system')
    const { user, logOut, loading } = useAuth();
    console.log(user)
    return (
        <header className="flex h-20 w-full items-center px-4 md:px-6 shadow-xl border-b-2 bg-popover-foreground">
            <Link href="/" className="flex items-center">
                {/* <Image src={logo} alt="site_logo" height={30} width={30} className="rounded-full" /> */}
                <span className="ml-2 text-xl italic font-extrabold text-white hidden lg:flex items-center ">
                    Zen-Task
                    <RiMenu2Fill className="text-3xl mt-2" />
                </span>
                <span className="lg:hidden text-white text-3xl font-bold">
                    <RiMenu2Fill />
                </span>
            </Link>
            {/* Login/Register Buttons */}
            {user ? (
                <>
                    <div className="ml-auto flex items-center">
                        {/*DropDown user  */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src='https://i.ibb.co.com/RbY8vby/avatar.png' alt="avatar" />
                                    <AvatarFallback />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="">
                                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                                <DropdownMenuLabel onClick={logOut}>LogOut</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            ) : (
                <div className="ml-auto flex items-center">
                    <Link className="mx-2 text-white" href="/register">Register</Link>
                    <Link className="cursor-pointer" href="/login">
                        <Button variant="default" className="rounded-full">Login</Button>
                    </Link>
                </div>
            )}
            {/* theme */}
            <div className="ml-3">
                {currentTheme === "light" ? <MoonIcon
                    onClick={() => setTheme('dark')}
                    className="" /> : <SunIcon
                    onClick={() => setTheme('light')}
                    className="" />}
            </div>
        </header>
    );
};
//theme toggle
function MoonIcon(props: object) {
    console.log(props)
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}

function SunIcon(props: object) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}
export default Navbar;