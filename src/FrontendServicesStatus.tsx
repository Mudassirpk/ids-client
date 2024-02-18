import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/services.service.ts";
import Loading from "./components/Loading.tsx";
import FrontEndServiceRow from "./components/Services/FrontendServiceRow.tsx";

export default function FrontendServicesStatus() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["frontend-services"],
    queryFn: () => getServices("frontend"),
  });

  return (
    <section className={"w-full px-4 mx-auto"}>
      <h2 className="mt-4 font-semibold text-xl bg-blue-700 text-white rounded-lg px-4 py-2">
        Status of Frontend Services
      </h2>
      {isLoading ? (
        <Loading />
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
                        Repo
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Domain
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map(
                      (
                        service: {
                          _id: string;
                          name: string;
                          repo: string;
                          domain: string;
                        },
                        index: number,
                      ) => {
                        return (
                          <FrontEndServiceRow service={service} index={index} />
                        );
                      },
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
