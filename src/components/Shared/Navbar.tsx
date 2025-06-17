'use client'
import Link from "next/link";
import { Button } from "../ui/button";
import { RiMenu2Fill } from "react-icons/ri";
import { useTheme } from "next-themes";
import { useAuth } from "@/Provider/AuthProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";
type IconProps = React.SVGProps<SVGSVGElement>;


const Navbar = () => {
    const { user, logOut } = useAuth();
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
                    <div className="ml-auto flex items-center dark:text-primary">
                        {/*DropDown user  */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt="avatar" />
                                    <AvatarFallback />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="">
                                <DropdownMenuLabel className="dark:text-primary">{user?.name}</DropdownMenuLabel>
                                <DropdownMenuLabel className="dark:text-primary">{user.email}</DropdownMenuLabel>
                                <DropdownMenuLabel className="dark:text-primary" onClick={logOut}>LogOut</DropdownMenuLabel>
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
            <ThemeToggle />
        </header>
    );
};

export default Navbar;