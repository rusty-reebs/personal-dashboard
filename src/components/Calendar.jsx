import { TbCalendarEvent } from "react-icons/tb";
import { ActionIcon } from "@mantine/core";

export default function Calendar() {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Calendar</p>
      <div className="flex flex-row gap-2">
        <a
          href="
          https://www.google.com/url?q=https://us02web.zoom.us/j/81063979092?pwd%3DaTNHSWRibjBzcHBuQ2VKWUZTTG9Udz09&sa=D&source=calendar&usd=2&usg=AOvVaw3-LdYIyC_Rre_QuXoots_t"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionIcon variant="filled">
            <TbCalendarEvent size={20} />
          </ActionIcon>
        </a>
        Morning meeting <span className="text-xs self-center">9:30AM</span>
      </div>
      <div className="flex flex-row gap-2">
        <a
          href="
          https://www.google.com/url?q=https://us02web.zoom.us/j/83627148995?pwd%3DTm9vMEhTdmtGU2FlOW5XQ0RsTC91Zz09&sa=D&source=calendar&usd=2&usg=AOvVaw2Z0i27_sUxPRKeEOgHqK65"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionIcon variant="filled">
            <TbCalendarEvent size={20} />
          </ActionIcon>
        </a>
        Afternoon meeting <span className="text-xs self-center">2:00PM</span>
      </div>
    </div>
  );
}
