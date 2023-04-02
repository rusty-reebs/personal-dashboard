import { ActionIcon, Image } from "@mantine/core";
import { useEffect, useState } from "react";
// import useClock from "../hooks/useClock";
import differenceInMinutes from "date-fns/differenceInMinutes";

export default function Links() {
  console.count("Links");
  const [isSoon, setIsSoon] = useState(false);
  const [isNow, setIsNow] = useState(false);

  // const time = useClock();

  const morningMeeting = new Date();
  morningMeeting.setHours(8, 30, 0);

  const afternoonMeeting = new Date();
  afternoonMeeting.setHours(13, 0, 0);

  // useEffect(() => {
  //   const diff = differenceInMinutes(
  //     new Date().getHours() < 12 ? morningMeeting : afternoonMeeting,
  //     time
  //   );
  //   if (diff <= 10 && diff >= 2) {
  //     setIsSoon(true);
  //   }
  //   if (diff <= 1 && diff >= -30) {
  //     setIsNow(true);
  //   }
  // }, [time]);

  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Links</p>
      <div className="flex flex-row gap-2">
        <a
          href={import.meta.env.VITE_MORNING}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionIcon variant="filled">
            <Image src="/img/zoom.png" alt="zoom" height={20} width={20} />
          </ActionIcon>
        </a>
        Morning meeting <span className="text-xs self-center">8:30AM</span>
        {isSoon && new Date().getHours() < 12 ? (
          <Soon />
        ) : isNow && new Date().getHours() < 12 ? (
          <Now />
        ) : null}
      </div>
      <div className="flex flex-row gap-2">
        <a
          href={import.meta.env.VITE_AFTERNOON}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionIcon variant="filled">
            <Image src="/img/zoom.png" alt="zoom" height={20} width={20} />
          </ActionIcon>
        </a>
        Afternoon meeting <span className="text-xs self-center">1:00PM</span>
        {isSoon && new Date().getHours() > 12 ? (
          <Soon />
        ) : isNow && new Date().getHours() > 12 ? (
          <Now />
        ) : null}
      </div>
    </div>
  );
}

function Soon() {
  return (
    <span>
      <div className="bg-emerald-500 rounded-lg text-sm px-1 text-white">
        SOON
      </div>
    </span>
  );
}

function Now() {
  return (
    <span>
      <div className="bg-three rounded-lg text-sm px-1 text-white">NOW</div>
    </span>
  );
}
