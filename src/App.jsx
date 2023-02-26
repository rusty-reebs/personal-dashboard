import Links from "./components/Links";
import Greeting from "./components/Greeting";
import Pocket from "./components/Pocket";
import AllTodos from "./components/AllTodos";

function App() {
  return (
    <div className="grid lg:grid-cols-3 lg:grid-rows-2 p-10 gap-10 bg-one h-screen font-sans">
      <Greeting />
      <AllTodos />
      <Pocket />
      <Links />
    </div>
  );
}

export default App;
