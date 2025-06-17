import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "@/Provider/AuthProvider";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useUpdateTask } from "@/app/all-task/api/routes";

type Inputs = {
    title: string,
    description: string,
    due_Date: string,
    email: string | undefined,
    tags: string,
    status: string | undefined,
    priority: string | undefined,
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
interface CardProp {
    task: Task
}
const UpdateModal = ({ task }: CardProp) => {
    const { _id, title, status, description, due_Date: due_Date, priority, tags } = task;
    const today = new Date().toISOString().split("T")[0];
    const updateTodo = useUpdateTask();
    const { user } = useAuth();
    const [newStatus, setStatus] = useState<string>(status);
    const [newPriority, setPriority] = useState<string>(priority);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (todo) => {
        todo.status = newStatus;
        todo.email = user?.email;
        todo.priority = newPriority;
        await updateTodo.mutateAsync({ _id, todo });

    }

    return (
        <div>
            < form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto">
                {/* Title */}
                <div className='space-y-2'>
                    <Label htmlFor="title">Title</Label>
                    <Input defaultValue={title}    {...register('title')} id="title" name="title" required />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className='space-y-2'>
                    <Label htmlFor="description">Description</Label>
                    <Textarea defaultValue={description}  {...register('description')} id="description" name="description" required />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    {/* Status */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <div>
                            <Select
                                defaultValue={status}
                                required
                                onValueChange={(value) => {
                                    setStatus(value)
                                }}
                            >
                                <Label>Status</Label>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Priority */}
                        <div>
                            <Select
                                defaultValue={priority}
                                required
                                onValueChange={(value) => {
                                    setPriority(value)
                                }}
                            >
                                <Label className='mb-2'>Priority</Label>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Due Date */}
                        <div>
                            <Label className='mb-2' htmlFor="due_Date">Due Date</Label>
                            <Input defaultValue={due_Date ? new Date(due_Date).toISOString().split("T")[0] : ""} min={today}  {...register('due_Date')} type="date" id="due_Date" name="due_Date"
                                required />
                            {errors.due_Date && <p className="text-sm text-red-500">{errors.due_Date.message}</p>}
                        </div>
                    </div>
                </div>
                {/* Tags */}
                <div>
                    <Label className='mb-2' htmlFor="tags">Tags</Label>
                    <Input defaultValue={tags}    {...register('tags')} id="tags" name="tags" placeholder="e.g. frontend, urgent" />
                    <p className="text-sm text-muted-foreground mt-1">Separate tags with commas</p>
                    {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
                </div>

                <Button type="submit" className="w-full">Update Task</Button>
            </form>
        </div>
    );
};

export default UpdateModal;