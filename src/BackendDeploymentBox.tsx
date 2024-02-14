import { FormEvent, useState } from "react";
import Divider from "./components/Divider";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Loading from "./components/Loading";

export default function BackendDeploymentBox() {
  const [deploymentInfo, setDeploymentInfo] = useState({
    repo_url: "",
    site_name: "",
    entry_file_name: "index.js",
    build_dir_name: "build",
    build_command: "",
  });

  const [processSuccess, setProcessSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  async function deploy(e: FormEvent) {
    setProcessSuccess(false);
    e.preventDefault();
    if (
      deploymentInfo.repo_url.length !== 0 &&
      deploymentInfo.build_dir_name.length !== 0 &&
      deploymentInfo.entry_file_name.length !== 0 &&
      deploymentInfo.site_name.length !== 0 &&
      deploymentInfo.build_command.length !== 0
    ) {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:3001/node-backend", {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
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
          setProcessSuccess(true);
        } else {
          setProcessSuccess(false);
          const modified_response = json_response.payload
            .split("TASK ")
            .map((log: string) => {
              const modified_log = log
                .replace(/\*+/g, " ")
                .replace(/\n+/g, " ")
                .replace(/\\n/g, "");
              return modified_log;
            });

          modified_response.push(json_response.error);
          setLogs(modified_response);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <section className="w-[50%] mx-auto px-4 mt-4 py-8 flex flex-col items-center">
      <h1 className="font-bold text-center text-blue-800 text-2xl">
        Deploy Node Backend
      </h1>
      <div className="w-[400px] my-2 mb-6">
        <Divider />
      </div>
      <form
        onSubmit={deploy}
        className="flex flex-col gap-2 items-center w-[400px] border-2 border-blue-800 p-4 rounded-lg"
      >
        <label className="flex flex-col gap-2 font-semibold w-full">
          Github repository url
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                repo_url: e.target.value,
              })
            }
            value={deploymentInfo.repo_url}
            type="text"
            placeholder="Github repo url"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-semibold w-full">
          Site Name
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                site_name: e.target.value,
              })
            }
            value={deploymentInfo.site_name}
            type="text"
            placeholder="Site's name"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-semibold w-full">
          Entry file name (default = index.js)
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                entry_file_name: e.target.value,
              })
            }
            value={deploymentInfo.entry_file_name}
            type="text"
            placeholder="index.js"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-semibold w-full">
          Build directory name (default = build)
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                build_dir_name: e.target.value,
              })
            }
            value={deploymentInfo.build_dir_name}
            type="text"
            placeholder="index.js"
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 font-semibold w-full">
          Build command
          <input
            required={true}
            onChange={(e) =>
              setDeploymentInfo({
                ...deploymentInfo,
                build_command: e.target.value,
              })
            }
            value={deploymentInfo.build_command}
            type="text"
            placeholder="index.js"
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
                if (index + 1 === logs.length && log.includes("PLAY ")) {
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
                } else if (index + 1 === logs.length && log.includes("(E)")) {
                  return (
                    <p
                      key={index}
                      className="flex gap-2 items-center text-red-400"
                    >
                      &gt; {log} <ImCancelCircle className="text-red-400" />
                    </p>
                  );
                }
                return (
                  <p key={index} className="flex gap-2 items-center">
                    &gt; {log} <TiTick className="text-green-400" />
                  </p>
                );
              }
            })}
            {processSuccess ? (
              <p className="text-green-400 font-semibold flex gap-2 items-center">
                &gt; Done....
              </p>
            ) : (
              <p className="text-red-400 font-semibold flex gap-2 items-center">
                &gt; Failed....
              </p>
            )}
          </p>
        </div>
      ) : null}
    </section>
  );
}
