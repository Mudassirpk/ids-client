import "./App.css";
import DeploymentBox from "./DeploymentBox";
import Services from "./Services";
import Divider from "./components/Divider";
import FrontendServicesStatus from "./FrontendServicesStatus.tsx";
import {Link} from "react-router-dom";

function App() {
    return (
        <main className="w-full">
            <header className={"w-full flex justify-center gap-2"}>
                <Link to={'repos'} className={"px-4 py-2 rounded-bl-lg rounded-br-lg bg-blue-700 text-white"}>See All Repos</Link>
            </header>
            <div className="w-full my-2 text-center">
                <h1 className="font-bold text-center text-2xl text-blue-800">
                    Iancon - Deployment Service
                </h1>
                <p className="text-blue-700 text-center font-semibold text-xl">
                    Version 1.0
                </p>
            </div>
            <DeploymentBox/>
            <Divider/>
            <Services/>
            <Divider/>
            <FrontendServicesStatus/>
        </main>
    );
}

export default App;
