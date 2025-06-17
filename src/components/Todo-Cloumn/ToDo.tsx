'use client'
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { useDeleteTodo } from "@/app/all-task/api/routes";
import Swal from 'sweetalert2';
import { Draggable } from "react-beautiful-dnd";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import UpdateModal from "../UpdateModal/UpdateModal";

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
interface CardProp {
    task: Task
    index: number,
}
const ToDo = ({ task, index }: CardProp) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const deleteTodo = useDeleteTodo();
    const { _id, title, status, description, due_Date: due_Date, priority, tags, createdAt } = task;
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
                await deleteTodo.mutateAsync(_id);
            }
        });
    }
    return (
        <>
            <Draggable draggableId={task._id.toString()} key={_id} index={index}>

                {
                    (provided, snapshot) => (<div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // isDragging={snapshot.isDragging}
                        className="bg-white dark:bg-primary-foreground rounded-2xl shadow-md border p-4 space-y-2 hover:shadow-lg transition-all"

                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-primary">{title}</h3>
                            <Badge className="capitalize">{status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-primary">{description}</p>
                        <div className="text-sm text-gray-500 dark:text-primary flex flex-col">
                            <span className="font-medium">createdAt:</span> {new Date(createdAt).toDateString()}
                            <span className="font-medium">Due:</span> {new Date(due_Date).toDateString()}
                        </div>
                        <div className="text-sm">
                            <span className="font-medium">Priority:</span>{" "}
                            <Badge className={`capitalize ${priority === 'High' ? 'bg-red-500' : priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                                {priority}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-2">
                            {tags?.map((tag, idx) => (
                                <Badge key={idx} className="bg-gray-100 text-gray-700 border">{tag}</Badge>
                            ))}
                        </div>
                        <div className="flex justify-center gap-8 mt-2 ">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <FaPencilAlt className="cursor-pointer text-lg " />

                                </DialogTrigger>
                                <DialogContent className="md:max-w-4xl">
                                    <DialogHeader className="text-primary text-center">
                                        <DialogTitle className="text-center">Edit The Task</DialogTitle>
                                    </DialogHeader>
                                    <UpdateModal task={task}></UpdateModal>
                                </DialogContent>
                            </Dialog>
                            <FaRegTrashAlt onClick={() => handleDeleteTask(_id)} className="cursor-pointer text-red-700 text-lg" />
                        </div>
                    </div>)
                }
            </Draggable>

        </>
    );
};

export default ToDo;
