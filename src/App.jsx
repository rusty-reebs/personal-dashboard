import { useState } from "react";
import Greeting from "./components/Greeting";
import Todos from "./components/Todos";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="flex flex-row gap-4 bg-one h-screen">
      <Greeting />
      <Todos />
      <Weather />
    </div>
  );
}

export default App;
