'use client'
import DashboardLayout from '../page';
import { useGetTodo, useUpdateTaskDnD } from './api/routes';
import Loading from '../loading';
import { useAuth } from '@/Provider/AuthProvider';
import ToDo from '@/components/Todo-Cloumn/ToDo';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiGrid2H, CiGrid2V } from "react-icons/ci";
type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
const Page = () => {
    const router = useRouter()
    const { user } = useAuth();
    const [isGridView, setIsGridView] = useState(true);
    const [todayTasks, setTodayTasks] = useState('');
    // handle search
    const [search, setSearch] = useState<string>('')
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch((e.target as HTMLFormElement).search.value);
    }
    if (!user) {
        return router.replace('/login')
    }
    //   handle select
    const [sortDate, setSortDate] = useState('')
    const updateWithDnD = useUpdateTaskDnD();

    const email = user?.email;
    const { data: tasks, isPending, error, isError } = useGetTodo({ email, sortDate, search, todayTasks });
    if (isPending || !tasks || !tasks.todo || !tasks.inProgress || !tasks.completed) {
        return <Loading />;
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;

    // drag end fn for drag and drop
    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        console.log(result, 'result')
        if (!destination || source.droppableId === destination.droppableId) return;
        if (!destination) return;
        const newStatus = destination.droppableId as TaskStatus;
        // draggableId-as todo id
        // condition for safety
        if (draggableId) {
            await updateWithDnD.mutateAsync({ _id: draggableId, status: newStatus })
        }
    }

    return (

        <DashboardLayout>
            <head>
                <title>ZenTask Kanban | All Task</title>
            </head>
            <DragDropContext onDragEnd={handleDragEnd}>
                <section>
                    <div className='text-center'>
                        <h2 className="text-2xl font-semibold">All Tasks</h2>
                        <p className="mt-1">...Browse your tasks below and update them as needed...</p>
                    </div>
                    {/* filter */}
                    <div className="my-3 flex items-center gap-3">

                        <div className="w-full max-w-3xl border border-primary rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 mx-auto">
                            <form
                                onSubmit={handleSearch}
                                className="flex w-full md:w-2/3">
                                <Input
                                    name='search'
                                    type="text"
                                    placeholder="name, tags, descrip.."
                                    className="rounded-r-none border-r-0"
                                />
                                <Button className="rounded-l-none">
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </form>

                            {/* Dropdown */}
                            <Select
                                defaultValue={sortDate}
                                onValueChange={(value) => setSortDate(value)}
                            >
                                <SelectTrigger className="w-full md:w-[250px]">
                                    <SelectValue placeholder="Sort by date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New Date (Come First)</SelectItem>
                                    <SelectItem value="old">Old Date (Come First)</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={() => setTodayTasks('today')} variant='default' >Today</Button>
                        </div>
                    </div>
                    {/* layout toggle */}
                    <div className='hidden md:flex justify-end'>
                        <div onClick={() => setIsGridView(!isGridView)} className="ml-0 border-2 border-primary rounded-md">
                            {
                                isGridView ? <CiGrid2V title='View to grid' className='text-4xl p-2 cursor-pointer' /> : <CiGrid2H title='View to column' className='text-4xl p-2 cursor-pointer' />
                            }
                        </div>
                    </div>
                    <section className={`grid grid-cols-1 ${isGridView && "md:grid-cols-2 lg:grid-cols-3"} gap-2 mt-8`}>
                        {/* To Do Column */}
                        <div className="">
                            <div className={`text-center ${!isGridView && "text-start"} text-2xl text-primary font-bold`}>
                                <h2>To Do</h2>
                                <Droppable droppableId='To Do'>
                                    {
                                        (provided, snapshot) => (<div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            // isDraggingOver={snapshot.isDraggingOver}
                                            className={`mt-5 gap-5 grid min-h-[200px] border border-gray-300 rounded p-2 ${!isGridView && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                                        >
                                            {tasks.todo.map((task, index) => (
                                                <ToDo key={task._id} task={task} index={index} />
                                            ))}  {provided.placeholder}

                                        </div>)
                                    }
                                </Droppable>
                            </div>
                        </div>

                        {/* In Progress Column */}
                        <div className="text-2xl text-primary font-bold">
                            <div className='text-center'>
                                <h2 className={`text-center ${!isGridView && "text-start"} text-2xl text-primary font-bold`}>In Progress</h2>

                                <Droppable droppableId='In Progress'>
                                    {
                                        (provided, snapshot) => (<div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            // isDraggingOver={snapshot.isDraggingOver}
                                            className={`mt-5 gap-5 grid min-h-[200px] border border-gray-300 rounded p-2 ${!isGridView && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                                        >
                                            {tasks.inProgress.map((task, index) => (
                                                <ToDo key={task._id} task={task} index={index} />
                                            ))}  {provided.placeholder}

                                        </div>)
                                    }
                                </Droppable>
                            </div>
                        </div>

                        {/* Completed Column */}
                        <div className="text-2xl text-primary font-bold">
                            <div className='text-center'>
                                <h2 className={`text-center ${!isGridView && "text-start"} text-2xl text-primary font-bold`}>Completed</h2>
                                <Droppable droppableId='Completed'>
                                    {
                                        (provided, snapshot) => (<div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            // isDraggingOver={snapshot.isDraggingOver}
                                            className={`mt-5 gap-5 grid min-h-[200px] border border-gray-300 rounded p-2 ${!isGridView && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                                        >
                                            {tasks.completed.map((task, index) => (
                                                <ToDo key={task._id} task={task} index={index} />
                                            ))}  {provided.placeholder}

                                        </div>)
                                    }
                                </Droppable>
                            </div>
                        </div>
                    </section>
                </section>
            </DragDropContext>
        </DashboardLayout>

    );
};

export default Page;
