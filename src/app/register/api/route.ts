import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
interface ApiErrorResponse {
    message?: string;
}
// Register a new user
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user_info: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/register`, user_info)
            console.log(data,'res form server')
            return data
        },
        mutationKey: ['create-user'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Registration successfully please login')
                queryClient.invalidateQueries({ queryKey: ['all-users'] })
            }
        }, onError: (error) => {
            //error.response.data.message
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const existedError = axiosError?.response?.data?.message;
            console.log(existedError)
            if (existedError) {
                toast.error(existedError)
            } else if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('failed to create account')
            }

        },
    })
}