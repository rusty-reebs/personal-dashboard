import { TodoistApi } from "@doist/todoist-api-typescript";
import { Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";

export default function Todos() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isStrikeout, setIsStrikeout] = useState({ id: null, state: false });

  const todoist = new TodoistApi(import.meta.env.VITE_TODOIST_BEARER_TOKEN);

  //? put this in a setInterval?
  useEffect(() => {
    todoist
      .getTasks({ projectId: 2287542106 })
      .then((tasks) => {
        setTasks(tasks);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  const handleCompleted = (id) => {
    setIsStrikeout((current) => ({ ...current, id: id, state: true }));
    todoist
      .closeTask(id)
      .then((result) => {
        if (result) {
          todoist
            .getTasks({ projectId: 2287542106 })
            .then((tasks) => {
              setIsStrikeout({ current: null, state: false });
              setTasks(tasks);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setIsError(true);
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Today's Tasks</p>
      {isError ? (
        <div className="mx-auto my-auto">⚠️</div>
      ) : isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto my-auto" />
      ) : (
        <div className="grid grid-cols-2 grid-flow-row auto-cols-fr gap-2 py-2 overflow-y-auto">
          {tasks
            .filter((task) => new Date(task.due.date) <= new Date())
            .map((task) => (
              <div key={task.id} className="flex flex-col">
                <div className="flex flex-row gap-3 items-center">
                  <Checkbox
                    size="sm"
                    className=""
                    onChange={() => handleCompleted(task.id)}
                  />
                  <div className="flex flex-col">
                    <p
                      className={`${
                        isStrikeout.id == task.id && isStrikeout.state
                          ? "line-through"
                          : null
                      }`}
                    >
                      {task.content}
                    </p>
                    <p
                      className={`text-xs italic uppercase ${
                        isStrikeout.id == task.id && isStrikeout.state
                          ? "line-through"
                          : null
                      }`}
                    >
                      {task?.due?.string}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
