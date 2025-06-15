import { Badge } from "../ui/badge";

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
const ToDo = ({ task }: CardProp) => {
    console.log(task)
    const { _id, title, status, description, due_Date: due_Date, priority, tags } = task;
    return (
        <div className="bg-white rounded-2xl shadow-md border p-4 space-y-2 hover:shadow-lg transition-all">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
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
        </div>
    );
};

export default ToDo;
