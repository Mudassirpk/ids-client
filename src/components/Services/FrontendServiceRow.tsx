import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function FrontEndServiceRow({
  service,
  index,
}: {
  service: {
    _id: string;
    name: string;
    repo: string;
    domain: string;
  };
  index: number;
}) {
  const [status, setStatus] = useState<null | "online" | "offline">(null);
  async function checkStatus() {
    try {
      const res = await axios.get(service.domain);
      if (res.status) {
        setStatus("online");
      } else {
        setStatus("offline");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const {
    status: site_sync_status,
    reset,
    mutate: sync_site,
  } = useMutation({
    mutationKey: ["site_sync"],
    mutationFn: async (site_id: string) =>
      await axios.post(
        "api/sync/sync-site",
        {
          site: site_id,
        },
        {
          headers: {
            "x-auth-token": "Bearer " + localStorage.getItem("auth-token"),
          },
        }
      ),
    onSuccess(data) {
      if (data?.data.success) {
        setTimeout(reset, 5000);
      }
    },
  });

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <tr
      key={service._id}
      className="font-semibold border-b dark:border-neutral-500 text-lg text-black"
    >
      <td className="whitespace-nowrap px-6 font-medium py-2">{index + 1}</td>
      <td className="whitespace-nowrap px-6  py-2">{service.name}</td>
      <td className={"py-2"}>{service.repo}</td>
      <td className="whitespace-nowrap px-6  py-2">
        <a className={"text-blue-500 hover:underline"} href={service.domain}>
          {service.domain}
        </a>
      </td>
      <td
        className={`whitespace-nowrap px-6  py-2 font-semibold ${
          status === "online"
            ? "text-green-900 bg-green-100"
            : "bg-red-100 text-red-900"
        }`}
      >
        {status}
      </td>
      <td className="flex justify-center py-2 px-6 items-center">
        <button
          onClick={() => sync_site(service._id)}
          disabled={site_sync_status === "pending"}
          className={`px-2 py-1 rounded-lg ${
            site_sync_status === "pending"
              ? "bg-gray-300 pointer-events-none"
              : "bg-blue-600 hover:bg-blue-500 "
          } text-white`}
        >
          {site_sync_status === "pending" ? (
            <Loading />
          ) : site_sync_status === "success" ? (
            "Site Synced Successfully"
          ) : (
            "Sync"
          )}
        </button>
      </td>
    </tr>
  );
}
