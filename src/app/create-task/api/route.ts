import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
interface ApiErrorResponse {
    message?: string;
}
// create a task
export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTodo: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/create-todo`, newTodo)
            return data
        },
        mutationKey: ['create-task'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Task created Successfully')
                queryClient.invalidateQueries({ queryKey: ['all-task'] })
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
                toast.error('failed to create task')
            }
        },
    })
}