import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Get summary for dashboard
export const useGetDashboard = (email: string | undefined) => {

    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/todo/dashboard/${email}`)
            return data;
        },
        queryKey: ['dashboard']
    })
    return { data, isPending, isError, error }
}