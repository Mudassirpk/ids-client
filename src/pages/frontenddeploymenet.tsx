import { useState, FormEvent, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Divider from "../components/Divider.tsx";
import Loading from "../components/Loading.tsx";
import { useAuth } from "../providers/authprovider.tsx";

export default function Frontenddeploymenet() {
  const [user,_setUser] = useAuth()

  const [deploymentInfo, setDeploymentInfo] = useState({
    git_url: "",
    domain: "",
  });
  const [envFile, setEnvFile] = useState<File | null>();
  const params = new URLSearchParams(window.location.search);

  // Get the value of the 'url' parameter
  const [processSuccess, setProcessSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const ssh_url = params.get("ssh_url");
    if (ssh_url) {
      setDeploymentInfo({ ...deploymentInfo, git_url: ssh_url });
    }
  }, []);

  async function deploy(e: FormEvent) {
    setProcessSuccess(false);
    e.preventDefault();
    if (
      deploymentInfo.domain.length !== 0 &&
      deploymentInfo.git_url.length !== 0
    ) {
      try {
        const formData = new FormData();
        formData.append("domain", deploymentInfo.domain);
        formData.append("git_url", deploymentInfo.git_url);
        formData.append("env", envFile as Blob);
        const repo_name = params.get("repo_name");
        formData.append("repo_name", repo_name as string);

        setIsLoading(true);

        const response = await fetch("http://localhost:3001/react-frontend", {
          headers: {
            "x-auth-token": "Bearer " + localStorage.getItem("auth-token"),
          },
          method: "POST",
          body: formData,
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
        <label className="flex flex-col gap-2 font-semibold w-full">
          Environment variables file
          <span className="font-normal text-sm">
            (if you are not using any environment variables you can leave it)
          </span>
          <input
            accept=".env.*"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setEnvFile(e.target.files[0]);
              }
            }}
            className="p-2 border-2 border-blue-300 rounded-lg"
          />
          <span className="text-green-600 font-normal">
            Feature for adding individual environment variables will be added
            soon in version 1.1
          </span>
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
