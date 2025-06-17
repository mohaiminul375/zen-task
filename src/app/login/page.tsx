'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserLogin } from './api/route';
import { useAuth } from '@/Provider/AuthProvider';
import { useRouter } from 'next/navigation';
import Loading from '../loading';
const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
type Inputs = {
    name: string
    email: string
    password: string
}
const LogIn = () => {
    const router = useRouter()
    const { user, loading } = useAuth()
    const userLogin = useUserLogin();
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);
    if (loading) {
        return <Loading />
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (user_data) => {
        console.log(user_data)
        await userLogin.mutateAsync(user_data)
        // reset();
    }
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-4 lg:px-16 items-center">
            <head>
                <title>ZenTask Kanban | Login</title>
            </head>
            {/* Left side: Animation */}
            <div className="hidden md:flex justify-center">
                <LottiePlayer
                    autoplay
                    loop
                    src="/auth.json"
                    style={{ height: 'auto' }}
                    className="w-full max-w-md"
                />
            </div>
            {/* Right side: Form */}
            <div className="bg-popover-foreground dark:bg-primary-foreground shadow-md rounded-xl p-6 sm:p-8 text-white">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    {/* Email */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="email">
                            Email <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <Input
                        defaultValue='mohaiminul375@gmail.com'
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            required
                            {...register('email')}
                        />
                    </div>
                    {/* Password */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="password">
                            Password <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                            defaultValue='246123'
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter Password"
                                className="pr-10"
                                required
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-white" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-white" />
                                )}
                            </Button>
                            {errors.password && <p className='text-red-700 text-sm'>{errors.password.message}</p>}
                        </div>
                    </div>
                    {/* Submit */}
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full font-semibold"
                    >
                        LogIn
                    </Button>
                </form>
                {/* Navigate To Login Page */}
                <div className='mt-3 text-center'>
                    <p className='text-sm'>New Here? <Link
                        href='/register'
                        className='hover:underline cursor-pointer'>Please Register</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LogIn;