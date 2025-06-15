import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
interface ApiErrorResponse {
    message?: string;
}
export const useGetTodo = (email: string | undefined) => {

    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/all-todo/${email}`)
            return data;
        },
        queryKey: ['all-task']
    })
    return { data, isPending, isError, error }
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/${id}`)
            return data;
        },
        mutationKey: ['delete-todo'],
        onSuccess: (data) => {
            if (data.success === true) {
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
                toast.error('failed to create account')
            }

        },
    })
}