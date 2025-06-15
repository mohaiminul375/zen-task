'use client'

import Greetings from "@/components/Shared/Greetings";
import { Button } from "@/components/ui/button";
import { Cross, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  return (
    <section className="border-2 border-red-700">

      {/* dashboard */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`bg-gray-900 text-white min-h-[calc(100vh-100px)] transition-all duration-300 ${open ? 'w-64' : 'w-0'} overflow-hidden`}>
          <div className="flex items-center justify-between p-4">
            <h1 className={`text-xl font-bold transition-all ${open ? 'block' : 'hidden'}`}>Dashboard</h1>
            <Button variant="ghost" onClick={() => setOpen(!open)} size="icon">
              {open ? <Cross className="" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          <ul>
            <li><Link href='/create-task'>create task</Link></li>
            <li><Link href='/all-task'>all task</Link></li>
          </ul>

        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <div>
            <Button className="border border-red-600" variant="ghost" onClick={() => setOpen(!open)} size="icon"></Button>
            {isHomePage && <Greetings />}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
