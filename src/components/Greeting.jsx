import format from "date-fns/format";
import Weather from "./Weather";

export default function Greeting() {
  const today = new Date();
  const hour = format(new Date(today), "H");

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-lg text-five">
      Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"}!
      <div className="mt-auto">
        <Weather />
      </div>
    </div>
  );
}
