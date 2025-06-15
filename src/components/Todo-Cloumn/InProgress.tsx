import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { useDeleteTodo } from "@/app/all-task/api/routes";
import Swal from 'sweetalert2';

interface Task {
    _id: string,
    title: string,
    description: string,
    due_Date: string,
    priority: string,
    status: string,
    tags: string[],
}
interface CardProp {
    task: Task
}
const InProgress = ({ task }: CardProp) => {
    const deleteTodo = useDeleteTodo();
    const { _id, title, status, description, due_Date: due_Date, priority, tags } = task;
    const handleDeleteTask = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteTodo.mutateAsync(_id);
                console.log(res)
                if (res.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }

    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 space-y-2 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <Badge className="capitalize">{status}</Badge>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="text-sm text-gray-500">
                <span className="font-medium">Due:</span> {new Date(due_Date).toDateString()}
            </div>
            <div className="text-sm">
                <span className="font-medium">Priority:</span>{" "}
                <Badge className={`capitalize ${priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                    {task.priority}
                </Badge>
            </div>
            <div className="flex flex-wrap gap-1 pt-2">
                {tags?.map((tag, idx) => (
                    <Badge key={idx} className="bg-gray-100 text-gray-700 border">{tag}</Badge>
                ))}
            </div>
            <div className="flex justify-around mt-2">
                <FaPencilAlt className="cursor-pointer text-red-700 text-lg" />
                <FaRegTrashAlt
                    onClick={() => handleDeleteTask(_id)}
                    className="cursor-pointer text-red-700 text-lg" />
            </div>
        </div>
    );
};

export default InProgress;
