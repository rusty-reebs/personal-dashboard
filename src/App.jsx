import Links from "./components/Links";
import Greeting from "./components/Greeting";
import MonthGoals from "./components/MonthGoals";
import Note from "./components/Note";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-2 p-10 gap-10 bg-one h-screen font-sans">
      <Greeting />
      <Todos />
      <Links />
      <Note />
      <MonthGoals />
    </div>
  );
}

export default App;
