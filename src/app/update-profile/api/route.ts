import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
interface ApiErrorResponse {
    message?: string;
}
interface UpdateProps {
    _id?: string,
    user_data?: object,
    status?: 'To Do' | 'In Progress' | 'Completed' | undefined;
}
// update Profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ _id, user_data }: UpdateProps) => {
            console.log(_id, user_data)
            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/update-user/${_id}`, user_data)
            return data
        },
        mutationKey: ['update-profile'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Profile updated successfully')
                location.reload();
                // queryClient.invalidateQueries({ queryKey: ['all-task'] })
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
                toast.error('failed to update profile')
            }

        },
    })
}