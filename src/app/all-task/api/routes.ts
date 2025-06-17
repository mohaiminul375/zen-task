import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
interface ApiErrorResponse {
    message?: string;
}
interface UpdateProps {
    _id?: string,
    todo?: object,
    status?: 'To Do' | 'In Progress' | 'Completed' | undefined;
}
interface Task {
    _id: string,
    title: string,
    description: string,
    due_Date: string,
    priority: string,
    status: string,
    tags: string[],
    createdAt: string,
}
interface AllTodo {
    todo: Task[],
    inProgress: Task[],
    completed: Task[],
}
interface FilterProp {
    email: string | undefined,
    search: string,
    sortDate: string,
    todayTasks: string,
}
// get all to by email
export const useGetTodo = ({ email, sortDate, search, todayTasks }: FilterProp) => {

    const { data, isPending, isError, error } = useQuery<AllTodo>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (sortDate) params.append('sort', sortDate);
            if (todayTasks) params.append('todayTasks', todayTasks);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/all-todo/${email}?${params.toString()}`)
            return data;
        },
        queryKey: ['all-task', { sortDate, search, todayTasks }]
    })

    return { data, isPending, isError, error }
}
// delete a todo
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
                toast.success('Task Deleted successfully')
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
// updateTodo
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ _id, todo }: UpdateProps) => {
            console.log(_id, todo)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/update-todo/${_id}`, todo)
            return data
        },
        mutationKey: ['update-todo'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Task updated Successfully')
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
// updateTodo Drag N Drop
export const useUpdateTaskDnD = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ _id, status }: UpdateProps) => {
            console.log(_id, status)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/update-todo-dnd/${_id}`, { status })
            return data
        },
        mutationKey: ['create-todo-dnd'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Task updated Successfully')
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