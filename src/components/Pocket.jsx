import { useEffect } from "react";

export default function Pocket() {
  // useEffect(() => {
  //   const getPocket = async () => {
  //     const result = await fetch(`${
  //       import.meta.env.DEV
  //       ? "http://127.0.0.1:9999/.netlify/functions/getPocket"
  //       : "/.netlify/functions/getPocket"
  //   }`
  // );
  //   };
  //   getPocket();
  // }, []);
  return (
    <div className="flex flex-col gap-4 p-8 rounded-lg bg-four border-[0.5px] border-three text-five">
      <p className="text-lg">Saved Reads</p>
    </div>
  );
}
