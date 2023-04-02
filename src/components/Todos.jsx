import { TodoistApi } from "@doist/todoist-api-typescript";
import { Checkbox, ActionIcon, Button } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { Loader } from "@mantine/core";
import format from "date-fns/format";
import { TbCircleX, TbSquarePlus } from "react-icons/tb";
import { FiSend } from "react-icons/fi";

export default function Todos() {
  // console.count("Todos");
  const todoist = new TodoistApi(import.meta.env.VITE_TODOIST_BEARER_TOKEN);
  const endToday = format(new Date(), "yyyy-MM-dd");

  const initialState = {
    tasks: [],
    isLoading: true,
    isSaving: false,
    isAdd: false,
    isError: false,
    errorMessage: "",
    isStrikeout: {
      id: null,
      state: false,
    },
    newTask: "",
    isToday: false,
  };

  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    initialState
  );

  const fetchTodos = async () => {
    todoist
      .getTasks({ projectId: 2287542106 })
      .then((tasks) => {
        dispatch({ tasks: tasks, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ isError: true, errorMessage: err.toString() });
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    window.addEventListener("focus", fetchTodos());
    window.addEventListener("focus", console.log("Fetching Todos..."));
    return () => {
      window.removeEventListener("focus", fetchTodos());
    };
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
              dispatch({ isError: true, errorMessage: err.toString() });
            });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (value) => {
    dispatch({ isSaving: true });
    todoist
      .addTask({
        content: value,
        dueString: state.isToday ? "today" : null,
      })
      .then((result) => {
        if (result) {
          todoist
            .getTasks({ projectId: 2287542106 })
            .then((tasks) =>
              dispatch({
                tasks: tasks,
                isSaving: false,
                isAdd: false,
              })
            )
            .catch((err) => {
              console.log(err);
              dispatch({ isError: true, errorMessage: err.toString() });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ isError: true, errorMessage: err.toString() });
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p className="text-lg">Today</p>
        {state.isSaving ? (
          <Loader variant="dots" color="#AF0404" className="self-center" />
        ) : !state.isAdd ? (
          <ActionIcon
            variant="filled"
            onClick={() => dispatch({ isAdd: true })}
          >
            <TbSquarePlus size={20} />
          </ActionIcon>
        ) : (
          <ActionIcon
            variant="filled"
            onClick={() => dispatch({ isAdd: false })}
          >
            <TbCircleX size={20} />
          </ActionIcon>
        )}
      </div>
      {state.isError ? (
        <div className="mx-auto my-auto">⚠️ {state.errorMessage}</div>
      ) : state.isLoading ? (
        <Loader variant="dots" color="#AF0404" className="mx-auto my-auto" />
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <div className="grid grid-cols-2 grid-flow-row auto-cols-fr gap-4 py-2">
            {!state.tasks.filter((task) => task?.due?.date <= endToday)
              .length && (
              <div className="col-span-2 mx-auto">🎉 All done! 🎉</div>
            )}
            {state.tasks
              .filter((task) => task?.due?.date <= endToday)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  state={state}
                  handleCompleted={handleCompleted}
                />
              ))}
          </div>
          <p className="text-xl pt-4">To Do</p>
          <div className="grid grid-cols-2 grid-flow-row auto-cols-fr gap-4 py-2">
            {state.tasks
              .filter((task) => !task.due)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  state={state}
                  handleCompleted={handleCompleted}
                />
              ))}
          </div>
          {state.isAdd ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter task"
                autoFocus
                onChange={(e) => dispatch({ newTask: e.currentTarget.value })}
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleSubmit(state.newTask) : null;
                }}
                className="mt-auto p-1 rounded-md bg-four border border-gray-100 focus:outline-three focus:appearance-none"
              />
              <div className="flex gap-3">
                <Checkbox
                  size="sm"
                  color="dark"
                  mt={4}
                  checked={state.isToday}
                  onChange={() => {
                    dispatch({ isToday: !state.isToday });
                  }}
                />
                <div className="pt-0.5">Due today?</div>
                <ActionIcon
                  variant="filled"
                  className="ml-auto"
                  onClick={() => handleSubmit(state.newTask)}
                >
                  <FiSend size={18} />
                </ActionIcon>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Task({ task, state, handleCompleted }) {
  return (
    <div key={task.id} className="flex flex-col">
      <div className="flex flex-row gap-3 items-center">
        <Checkbox
          size="sm"
          color="dark"
          className="self-start"
          onChange={() => handleCompleted(task.id)}
        />
        <div className="flex flex-col gap-1">
          <p
            className={`leading-4 ${
              state.isStrikeout.id == task.id && state.isStrikeout.state
                ? "line-through"
                : null
            }`}
          >
            {task.content}
          </p>
          <p
            className={`text-xs italic uppercase ${
              state.isStrikeout.id == task.id && state.isStrikeout.state
                ? "line-through"
                : null
            }`}
          >
            {task?.due?.string}
          </p>
        </div>
      </div>
    </div>
  );
}
