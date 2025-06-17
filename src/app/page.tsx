'use client'
import Profile from "@/components/Profile/Profile";
import Greetings from "@/components/Shared/Greetings";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Provider/AuthProvider";
import { Cross, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiPictureInPictureExitFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import ThemeToggle from "@/components/Shared/ThemeToggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logOut } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [])
  if (!user) {
    router.replace('/login')
  }
  const isHomePage = pathname === "/";
  return (
    <section className="">
      <head>
        <title>ZenTask Kanban | Dashboard</title>
      </head>
      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`
        bg-popover-foreground text-white min-h-screen transition-all duration-700 z-50
        ${open ? 'w-64' : 'w-0'}
        ${open ? 'fixed sm:relative' : 'overflow-hidden'}
        top-0 left-0
      `}
        >
          <div className="flex items-center justify-between p-4">
            <h1 className={`text-xl font-bold transition-all ${open ? 'block' : 'hidden'}`}>Dashboard Menu</h1>
            <Button className="border border-primary" variant="ghost" onClick={() => setOpen(!open)} size="icon">
              {open ? <RiPictureInPictureExitFill /> : <GiHamburgerMenu />}
            </Button>
          </div>
          <div className="flex justify-center mt-4 mb-7">
            <Profile />
          </div>
          <div className="flex flex-col  px-6 gap-5 min-h-[calc(100vh-280px)]">
            <Link className="bg-white text-black p-2 rounded-md text-center text-lg font-semibold" href='/'>Dashboard Home</Link>
            <Link className="bg-white text-black p-2 rounded-md text-center text-lg font-semibold" href='/create-task'>create task</Link>
            <Link className="bg-white text-black p-2 rounded-md text-center text-lg font-semibold" href='/all-task'>all task</Link>
            <Link className="bg-white text-black p-2 rounded-md text-center text-lg font-semibold" href='/update-profile'>Update Profile</Link>
          {/* bottom nav */}
            <div className="flex justify-between items-center mt-0 mb-0 px-6 flex-1">
              <div className="flex justify-between gap-6 items-center mt-auto mb-0 ">
                <button
                  className="flex items-center gap-1 bg-white text-black p-2 rounded-md text-center text-lg font-semibold mt-auto mb-6"
                  onClick={logOut}
                >
                  LogOut
                  <IoIosLogOut className="font-bold" />
                </button>
                <div
                  className="mb-8 mt-auto"

                >
                  <ThemeToggle />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Backdrop for small screens */}
        {open && (
          <div
            className="fixed  bg-black bg-opacity-50 sm:hidden z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 sm:ml-0">
          <div>
            <Button className={`border border-primary ${open && 'hidden'}`} variant="ghost" onClick={() => setOpen(!open)} size="icon">
              {open ? <RiPictureInPictureExitFill /> : <GiHamburgerMenu />}
            </Button>
            {isHomePage && <Greetings />}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
