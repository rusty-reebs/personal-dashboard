import { TodoistApi } from "@doist/todoist-api-typescript";
import { Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Todos() {
  const todoist = new TodoistApi(import.meta.env.VITE_TODOIST_BEARER_TOKEN);

  const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      todoist
        .getTasks({ projectId: 2287542106 })
        .then((tasks) => {
          setTasks(tasks);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, []);

    return { tasks, isLoading };
  };

  const { tasks, isLoading } = useTasks();

  return (
    <div className="flex flex-col gap-4 p-10 w-fit rounded-lg bg-four border-[0.5px] border-three text-five">
      <h2>Today's Tasks</h2>
      <ul>
        {isLoading ? (
          <li>Loading...</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="flex flex-row gap-4 py-2">
              <Checkbox size="sm" className="" />
              <p>{task.content}</p>
              <p className="text-sm italic uppercase">{task?.due?.string}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
