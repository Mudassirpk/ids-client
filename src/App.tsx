import "./App.css";
import DeploymentBox from "./DeploymentBox";
import Services from "./Services";

function App() {
  return (
    <main className="w-full">
      <div className="w-full my-2 text-center">
        <h1 className="font-bold text-center text-2xl text-blue-800">
          Iancon - Deployment Service
        </h1>
        <p className="text-blue-700 text-center font-semibold text-xl">
          Version 1.0
        </p>
      </div>
      <DeploymentBox />
      <Services />
    </main>
  );
}

export default App;
