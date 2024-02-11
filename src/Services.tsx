import { useEffect, useState } from "react";

export default function Services() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    async function get_status() {
      const response = await fetch("/api/status");
      if (response.status === 200) {
        const json_response = await response.json();
        console.log(json_response);
        setStatuses(json_response);
      } else {
        console.log(response);
      }
    }
    get_status();
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center my-6">
      <h2 className="mt-4 font-semibold text-xl bg-blue-700 text-white rounded-lg px-4 py-2">
        Status of Backend Services
      </h2>
      {statuses.length === 0 ? (
        <p className="w-full text-center text-lg text-gray-700">
          No running services found
        </p>
      ) : (
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
                        Service Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Service ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Path
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {statuses.map(
                      (
                        status: {
                          name: string;
                          id: number;
                          status: string;
                          path: string;
                        },
                        index: number
                      ) => {
                        return (
                          <tr className="border-b dark:border-neutral-500 text-lg text-black">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status.name}
                            </td>
                            <td className={`${status.name === 'online'?"text-green-700":"text-red-700"} font-semibold whitespace-nowrap px-6 py-4`}>
                              {status.status}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status.id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status.path}
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
