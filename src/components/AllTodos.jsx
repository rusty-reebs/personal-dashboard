import Todos from "./Todos";
import MonthGoals from "./MonthGoals";

export default function AllTodos() {
  return (
    <div className="col-start-2 row-span-2 flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <Todos />
      <MonthGoals />
    </div>
  );
}
