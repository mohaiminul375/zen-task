'use client'
import { useAuth } from "@/Provider/AuthProvider";
import { Button } from "../ui/button";
import { IoAdd } from "react-icons/io5";
import { useGetDashboard } from "@/app/api/route";
import Loading from "@/app/loading";
import Link from "next/link";
const Greetings = () => {
    const { user } = useAuth()
    const { data: summary, isPending, error, isError } = useGetDashboard(user?.email);
    if (isPending) {
        return <Loading />;
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    // get hour for greetings
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning";
        } else if (hour >= 12 && hour < 15) {
            return "Good Afternoon";
        } else if (hour >= 15 && hour < 20) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };
    return (
        <section>
            {/* intro of dashboard */}
            <h2 className='text-popover-foreground dark:text-primary text-2xl mt-5'>
                Welcome to Kanban Dashboard! <br />
                {getGreeting()}, <span className="font-semibold text-primary">{user?.name}</span>
            </h2>
            <p>Let’s make today productive. You’ve got this!</p>
            {/* summary data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4 my-5">
                {/* 1. Create Task */}
                <div className="bg-white dark:bg-primary dark:text-black rounded-lg shadow p-6 py-2 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-2">Create Task</h3>
                    <Link href='/create-task'>
                    
                    <Button className="border-primary-foreground border" variant='default'><IoAdd />Add Task</Button>
                    </Link>
                </div>

                {/* 2. Total Tasks */}
                <div className="bg-black text-white rounded-lg shadow p-6 py-2 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
                    <p className="text-3xl font-bold">{summary?.totalTasksCount}</p>
                </div>

                {/* 3. Today's Tasks */}
                <div className="bg-primary dark:bg-primary-foreground rounded-lg shadow p-6 py-2 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
                    <p className="text-3xl font-bold">{summary?.todaysTasksCount}</p>
                </div>

                {/* 4. Upcoming Tasks (Tomorrow) */}
                <div className="bg-popover-foreground text-white rounded-lg shadow p-6 py-2 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-semibold mb-2">Upcoming Tasks (Tomorrow)</h3>
                    <p className="text-3xl font-bold">{summary?.tomorrowsTasksCount}</p>
                </div>
            </div>
        </section>
    );
};
export default Greetings;