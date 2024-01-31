import { FormEvent, useState } from "react";
import Divider from "./components/Divider";
import Loading from "./components/Loading";
import { TiTick } from "react-icons/ti";

type Props = {};

function DeploymentBox({}: Props) {
  const [deploymentInfo, setDeploymentInfo] = useState({
    git_url: "",
    domain: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  async function deploy(e: FormEvent) {
    e.preventDefault();
    if (
      deploymentInfo.domain.length !== 0 &&
      deploymentInfo.git_url.length !== 0
    ) {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/setup", {
        headers: {
          "Content-Type": "application/json;charset=utf=8",
        },
        method: "POST",
        body: JSON.stringify(deploymentInfo),
      });

      const json_response = await response.json();

      setIsLoading(false);

      if (response.status === 201) {
        setLogs(
          json_response.payload.split("TASK ").map((log: string) => {
            const modified_log = log
              .replace(/\*+/g, " ")
              .replace(/\n+/g, " ")
              .replace(/\\n/g, "");
            return modified_log;
          })
        );
      }
    }
  }

  return (
    <div className="w-[90%] mx-auto px-4 mt-4 border-2 border-blue-300 rounded-lg py-8 flex flex-col items-center">
      {" "}
      <h1 className="font-bold text-center text-blue-800 text-2xl">
        Deploy React Frontend
      </h1>
      <div className="w-[400px] my-2">
        <Divider />
      </div>
      <form
        onSubmit={deploy}
        className="flex flex-col mt-4 border-2 rounded-lg border-blue-800 p-4 w-[400px] gap-2"
      >
        {" "}
        <label className="flex flex-col gap-2 font-semibold">
          Github repository url
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                git_url: e.target.value,
              })
            }
            value={deploymentInfo.git_url}
            type="text"
            placeholder="Github repo url"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-semibold">
          Domain
          <input
            required={true}
            value={deploymentInfo.domain}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                domain: e.target.value,
              })
            }
            type="text"
            placeholder="www.example.com"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 rounded-lg w-full"
          >
            Deploy
          </button>
        )}
      </form>
      {logs.length > 0 ? (
        <div className="w-full rounded-lg mt-4 border-2 border-blue-800 p-4">
          <h2 className="mb-2 font-bold text-2xl">Logs</h2>
          <p className="my-2 bg-gray-900 text-white p-2 rounded-lg">
            <p className="text-orange-400 font-semibold flex gap-2 items-center">
              &gt; Deployment Started....
            </p>
            {logs.map((log: string, index: number) => {
              if (log.includes("ok") || log.includes("changed")) {
                if (index + 1 === logs.length) {
                  return (
                    <>
                      <p key={index} className="flex gap-2 items-center">
                        &gt; {log.split("PLAY ")[0]}{" "}
                        <TiTick className="text-green-400" />
                      </p>
                      <p key={index} className="flex gap-2 items-center">
                        &gt; {log.split("PLAY ")[1]}{" "}
                        <TiTick className="text-green-400" />
                      </p>
                    </>
                  );
                }
                return (
                  <p key={index} className="flex gap-2 items-center">
                    &gt; {log} <TiTick className="text-green-400" />
                  </p>
                );
              }
            })}
            <p className="text-green-400 font-semibold flex gap-2 items-center">
              &gt; Done....
            </p>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default DeploymentBox;
