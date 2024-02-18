import "./App.css";
import Services from "./Services";
import FrontendServicesStatus from "./FrontendServicesStatus.tsx";

function App() {
  return (
    <main className="w-full">
      <h1
        className={"w-full text-center font-bold text-4xl my-6 text-blue-800"}
      >
        IDS - V 1.0
      </h1>
      <Services />
      <FrontendServicesStatus />
    </main>
  );
}

export default App;
