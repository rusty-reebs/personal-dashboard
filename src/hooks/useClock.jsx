// import { useEffect, useState } from "react";

// export default function useClock() {
//   const [time, setTime] = useState(null);
//   const now = new Date();
//   const seconds = now.getSeconds();
//   const diff = 60 - seconds;

//   useEffect(() => {
//     if (!time) {
//       setTimeout(() => {
//         setTime(new Date());
//       }, diff * 1000);
//     }
//   }, []);

//   useEffect(() => {
//     if (time) {
//       setInterval(() => {
//         setTime(new Date());
//       }, 60000);
//     }
//   }, [time]);
//   return time;
// }
