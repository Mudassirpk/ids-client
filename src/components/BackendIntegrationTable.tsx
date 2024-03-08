import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../services/services.service";
import Loading from "./Loading";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import axios from "axios";

function BackendIntegrationTable({
  selectedBERepo,
  setSelectedBERepo,
}: {
  selectedBERepo: string;
  setSelectedBERepo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { isFetching, isFetched, data } = useQuery({
    queryKey: ["backend-services"],
    queryFn: async () =>
      await axios.get("api/integrate/backend"),
  });

  return (
    <div className="w-1/2 mx-auto border border-gray-400 rounded-lg mt-4">
      <h2 className="font-semibold text-xl bg-blue-700 text-white rounded-lg px-4 py-2">
        Backend Services
      </h2>
      {isFetched && data?.data.length === 0 ? (
        <p className="my-2 w-full text-center text-lg text-gray-700">
          No running services found
        </p>
      ) : isFetching ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto ">
            <div className="inline-block py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr className="text-lg">
                      <th scope="col" className="px-6 py-4">
                        Select
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Service Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map(
                      (status: {
                        name: string;
                        id: number;
                        status: string;
                        path: string;
                      }) => {
                        return (
                          <tr className="border-b dark:border-neutral-500 text-lg text-black">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {selectedBERepo &&
                              selectedBERepo === status.name ? (
                                <IoCheckmarkDoneCircle className="text-3xl text-green-700" />
                              ) : (
                                <div
                                  className="w-5 h-5 hover:bg-gray-100 rounded-lg bg-gray-50 border border-gray-300"
                                  onClick={() => {
                                    setSelectedBERepo(status.name);
                                  }}
                                ></div>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status.name}
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
    </div>
  );
}

export default BackendIntegrationTable;
