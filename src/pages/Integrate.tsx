import { useState } from "react";
import FrontendIntegrationTable from "../components/FrontendIntegrationTable.tsx";
import BackendIntegrationTable from "../components/BackendIntegrationTable.tsx";

function Integrate() {
  const [selectedFERepo, setSelectedFERepo] = useState("");
  const [selectedBERepo, setSelectedBERepo] = useState("");

  const handleIntegration = async () => {
    try {
      // simulating api call
      setTimeout(() => {
        console.log("object");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-col flex">
      <div className="flex">
        <FrontendIntegrationTable
          selectedFERepo={selectedFERepo}
          setSelectedFERepo={setSelectedFERepo}
        />
        <BackendIntegrationTable
          selectedBERepo={selectedBERepo}
          setSelectedBERepo={setSelectedBERepo}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={handleIntegration}
          className="bg-green-400 my-4 p-3 rounded-md text-white cursor-pointer disabled:bg-gray-500"
          disabled={selectedFERepo === "" || selectedBERepo === ""}
        >
          Integrate
        </button>
      </div>
    </div>
  );
}

export default Integrate;
