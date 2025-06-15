import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTodo = (email: string | undefined) => {

    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/all-todo/${email}`)
            return data;
        },
        queryKey: ['all-users']
    })
    return { data, isPending, isError, error }
}