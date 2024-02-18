import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Repos() {
  const [repos, setRepos] = useState<string[] | null>(null);

  useEffect(() => {
    async function getRepos() {
      const res = await fetch("api/github/get-repos", {
        headers: {
          "x-auth-token": "Bearer " + localStorage.getItem("auth-token"),
        },
      });
      if (res.status === 200) {
        const j_res = await res.json();
        setRepos(j_res);
      }
    }

    getRepos();
  }, []);

  return (
    <main className={"w-full"}>
      <h1
        className={
          "text-2xl font-bold text-white bg-blue-700 px-4 py-2 rounded-lg max-w-max m-4"
        }
      >
        All Repos
      </h1>

      <div className={"w-full px-4"}>
        {repos ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className="text-lg">
                        <th scope="col" className="px-6 py-4">
                          S No.
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Repo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {repos.map((repo: string, index: number) => {
                        return (
                          <tr
                            key={index}
                            className="border-b dark:border-neutral-500 text-lg text-black"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {repo}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-[500px] flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    </main>
  );
}
