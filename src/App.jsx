import Links from "./components/Links";
import Greeting from "./components/Greeting";
import MonthGoals from "./components/MonthGoals";
import Note from "./components/Note";
import Todos from "./components/Todos";
import Pocket from "./components/Pocket";

function App() {
  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-2 p-10 gap-10 bg-one h-screen font-sans">
      <Greeting />
      <Todos />
      <Links />
      <Note />
      <MonthGoals />
      <Pocket />
    </div>
  );
}

export default App;
