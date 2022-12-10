import { useState } from "react";
import Greeting from "./components/Greeting";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-2 p-10 gap-10 bg-one h-screen font-sans">
      <Greeting />
      <Todos />
    </div>
  );
}

export default App;
