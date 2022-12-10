import format from "date-fns/format";

export default function Greeting() {
  const today = new Date();
  const hour = format(new Date(today), "H");

  return (
    <div className="flex p-10 w-fit rounded-lg bg-four border-[0.5px] border-three  text-five">
      Good {hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"}!
    </div>
  );
}
