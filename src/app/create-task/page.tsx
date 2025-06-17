'use client'
import DashboardLayout from '../page';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/Provider/AuthProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCreateTask } from './api/route';
import { useRouter } from 'next/navigation';
type Inputs = {
    title: string,
    description: string,
    due_Date: string,
    email: string | undefined,
    tags: string,
    status: string | undefined,
    priority: string | undefined,
}
const createTask = () => {
    const router = useRouter()
    const today = new Date().toISOString().split("T")[0];
    const createTodo = useCreateTask();
    const { user } = useAuth();
    const [status, setStatus] = useState<string>();
    const [priority, setPriority] = useState<string>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    // react hook form
    const onSubmit: SubmitHandler<Inputs> = async (todo) => {
        todo.status = status;
        todo.email = user?.email;
        todo.priority = priority;
        console.log(todo)
        await createTodo.mutateAsync(todo);
        reset();
    }
    // private the route
    if (!user) {
        return router.replace('/login')
    }
    return (
        <DashboardLayout>
            <head>
                <title>ZenTask Kanban | Create Task</title>
            </head>
            <section className='border max-w-2xl mx-auto p-4 rounded-md py-10 shadow-2xl'>
                <div className='text-center '>
                    <h2 className="text-2xl font-semibold">Create a New Task</h2>
                    <p className=" mt-1">
                        Fill in the form below to add a new task to your board.
                    </p>
                </div>
                {/* form */}
                <div className='md:max-w-4xl mx-auto px-3 md:px-0'>
                    < form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto ">
                        {/* Title */}
                        <div className='space-y-2'>
                            <Label htmlFor="title">Title <span className="text-red-600 font-bold">*</span></Label>
                            <Input    {...register('title')} id="title" name="title" required />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>

                        {/* Description */}
                        <div className='space-y-2'>
                            <Label htmlFor="description">Description <span className="text-red-600 font-bold">*</span></Label>
                            <Textarea    {...register('description')} id="description" name="description" required />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>

                        <div>
                            {/* Status */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                <div>
                                    <Select

                                        required
                                        onValueChange={(value) => {
                                            setStatus(value)
                                        }}
                                    >
                                        <Label className='mb-2'>Status <span className="text-red-600 font-bold">*</span></Label>
                                        <SelectTrigger className='w-full'>
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
                                        required
                                        onValueChange={(value) => {
                                            setPriority(value)
                                        }}
                                    >
                                        <Label className='mb-2'>Priority <span className="text-red-600 font-bold">*</span></Label>
                                        <SelectTrigger className='w-full'>
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
                                    <Label className='mb-2' htmlFor="due_Date">Due Date <span className="text-red-600 font-bold">*</span></Label>
                                    <Input min={today}  {...register('due_Date')} type="date" id="due_Date" name="due_Date"
                                        required />
                                    {errors.due_Date && <p className="text-sm text-red-500">{errors.due_Date.message}</p>}
                                </div>
                            </div>
                        </div>
                        {/* Tags */}
                        <div>
                            <Label className='mb-2' htmlFor="tags">Tags <span className="text-red-600 font-bold">*</span></Label>
                            <Input    {...register('tags')} id="tags" name="tags" placeholder="e.g. frontend, urgent" />
                            <p className="text-sm text-muted-foreground mt-1">Separate tags with commas</p>
                            {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
                        </div>

                        <Button type="submit" className="w-full">Create Task</Button>
                    </form>
                </div>
            </section>
        </DashboardLayout >
    );
};

export default createTask;