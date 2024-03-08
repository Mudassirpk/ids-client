import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import axios from "axios";

function FrontendIntegrationTable({
  selectedFERepo,
  setSelectedFERepo,
}: {
  selectedFERepo: string;
  setSelectedFERepo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { isFetching, isFetched, data } = useQuery({
    queryKey: ["frontend-services"],
    queryFn: async () =>
      await axios.get("api/integrate/frontend"),
  });

  return (
    <div className="w-1/2 mx-auto border border-gray-400 rounded-lg mt-4">
      <h2 className="font-semibold text-xl bg-blue-700 text-white rounded-lg px-4 py-2 w-full">
        Frontend Services
      </h2>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="flex flex-col ">
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
                        Domain
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map(
                      (service: {
                        _id: string;
                        name: string;
                        repo: string;
                        domain: string;
                      }) => {
                        return (
                          <tr
                            key={service._id}
                            className="font-semibold border-b dark:border-neutral-500 text-lg text-black"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {selectedFERepo &&
                              selectedFERepo === service.name ? (
                                <IoCheckmarkDoneCircle className="text-3xl text-green-700" />
                              ) : (
                                <div
                                  className="w-5 h-5 hover:bg-gray-100 rounded-lg bg-gray-50 border border-gray-300"
                                  onClick={() => {
                                    setSelectedFERepo(service.name);
                                  }}
                                ></div>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4  ">
                              <a
                                className={"text-blue-500 hover:underline"}
                                href={service.domain}
                              >
                                {service.domain}
                              </a>
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

export default FrontendIntegrationTable;
