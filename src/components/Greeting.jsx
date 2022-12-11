import format from "date-fns/format";
import { useState } from "react";
import Weather from "./Weather";

export default function Greeting() {
  const useTime = () => {
    const [hour, setHour] = useState(format(new Date(), "H"));
    setInterval(() => {
      setHour(format(new Date(), "H"));
    }, 300000);

    return hour;
  };

  const hour = useTime();

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-lg text-five">
      Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"}!
      <div className="mt-auto">
        <Weather />
      </div>
    </div>
  );
}
