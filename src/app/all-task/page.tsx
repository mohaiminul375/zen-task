'use client'
import DashboardLayout from '../page';
import { Badge } from '@/components/ui/badge';
import { useGetTodo } from './api/routes';
import Loading from '../loading';
import { useAuth } from '@/Provider/AuthProvider';
import ToDo from '@/components/Todo-Cloumn/ToDo';
import InProgress from '@/components/Todo-Cloumn/InProgress';
import Completed from '@/components/Todo-Cloumn/Completed';

const page = () => {
    const { user } = useAuth();
    const { data: tasks = [], isPending, error, isError } = useGetTodo(user?.email);
    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    }
    console.log(tasks);
    return (
        <DashboardLayout>
            <section >
                <div className='text-center'>
                    <h2 className="text-2xl font-semibold">Create a New Task</h2>
                    <p className=" mt-1">
                        Fill in the form below to add a new task to your board.
                    </p>
                </div>
                <section className='grid grid-cols-3 gap-2 mt-8'>
                    <div className="">
                        <div className='text-center text-2xl text-primary font-bold'>
                            <h2>To Do</h2>
                            <div className='mt-5 gap-5 grid'>
                                {
                                    tasks.todo?.map((task) => <ToDo
                                        key={task._id}
                                        task={task}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" text-2xl text-primary font-bold">
                        <div className='text-center'>
                            <h2>In Progress</h2>
                            <div className='mt-5 gap-5 grid border-x-2 border-primary px-2'>
                                {
                                    tasks.inProgress?.map((task) => <InProgress
                                        key={task._id}
                                        task={task}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" text-2xl text-primary font-bold">
                        <div className='text-center'>
                            <h2>Completed</h2>
                            <div className='mt-5 gap-5 grid'>
                                {
                                    tasks.completed?.map((task) => <Completed
                                        key={task._id}
                                        task={task}
                                    />)
                                }
                            </div>
                        </div>
                    </div>

                </section>
            </section>
        </DashboardLayout>
    );
};

export default page;