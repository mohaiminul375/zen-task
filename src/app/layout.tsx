'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import { ThemeProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/Provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <title>ZenTask Kanban Dashboard</title>
        </head>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <Navbar /> */}
              <main className="md:max-w-7xl mx-auto min-h-screen">
                {children}
              </main>
            </ThemeProvider>
          </QueryClientProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
