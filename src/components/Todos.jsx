import { TodoistApi } from "@doist/todoist-api-typescript";
import { Checkbox } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { Loader } from "@mantine/core";
import format from "date-fns/format";

export default function Todos() {
  const todoist = new TodoistApi(import.meta.env.VITE_TODOIST_BEARER_TOKEN);
  const endToday = format(new Date(), "yyyy-MM-dd");

  const initialState = {
    tasks: [],
    isLoading: true,
    isError: false,
    isStrikeout: {
      id: null,
      state: false,
    },
  };

  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  //? put this in a setInterval?
  useEffect(() => {
    todoist
      .getTasks({ projectId: 2287542106 })
      .then((tasks) => {
        dispatch({ tasks: tasks, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ isError: true });
      });
  }, []);

  const handleCompleted = (id) => {
    dispatch({ isStrikeout: { id: id, state: true } });
    todoist
      .closeTask(id)
      .then((result) => {
        if (result) {
          todoist
            .getTasks({ projectId: 2287542106 })
            .then((tasks) => {
              dispatch({
                isStrikeout: { id: null, state: false },
                tasks: tasks,
                isLoading: false,
              });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ isError: true });
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Today's Tasks</p>
      {state.isError ? (
        <div className="mx-auto my-auto">⚠️</div>
      ) : state.isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto my-auto" />
      ) : (
        <div className="grid grid-cols-2 grid-flow-row auto-cols-fr gap-4 py-2 overflow-y-auto">
          {state.tasks
            .filter((task) => task.due.date <= endToday)
            .map((task) => (
              <div key={task.id} className="flex flex-col">
                <div className="flex flex-row gap-3 items-center">
                  <Checkbox
                    size="sm"
                    className="self-start"
                    onChange={() => handleCompleted(task.id)}
                  />
                  <div className="flex flex-col gap-1">
                    <p
                      className={`leading-4 ${
                        state.isStrikeout.id == task.id &&
                        state.isStrikeout.state
                          ? "line-through"
                          : null
                      }`}
                    >
                      {task.content}
                    </p>
                    <p
                      className={`text-xs italic uppercase ${
                        state.isStrikeout.id == task.id &&
                        state.isStrikeout.state
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
