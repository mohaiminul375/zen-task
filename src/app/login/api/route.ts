'use client'
import { useAuth } from "@/Provider/AuthProvider"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
// Login function
interface ApiErrorResponse {
    message?: string;
}
//Handle Login Authentication
export const useUserLogin = () => {
    const { setToken } = useAuth();
    const router = useRouter();
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, user_info)
            return data
        },
        mutationKey: ['login-user'],
        onSuccess: (data) => {

            console.log(data)
            if (data.success === true) {
                toast.success('Login Successfully')
                // Set token to SS and update to call context API
                localStorage.setItem('token', data.token)
                setToken(data?.token)
                setTimeout(() => {
                    router.replace('/')
                }, 1000)
            }
        }, onError: (error) => {
            console.log(error)
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const existedError = axiosError?.response?.data?.message;
            if (existedError) {
                toast.error(existedError)
            } else if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('failed to login')
            }
        },
    })
}