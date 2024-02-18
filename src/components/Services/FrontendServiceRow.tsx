import axios from "axios";
import { useEffect, useState } from "react";
import Link from "react-router-dom";
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

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <tr
      key={service._id}
      className="font-semibold border-b dark:border-neutral-500 text-lg text-black"
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium py-2">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-6 py-4  py-2">{service.name}</td>
      <td className={"py-2"}>{service.repo}</td>
      <td className="whitespace-nowrap px-6 py-4  py-2">
        <a className={"text-blue-500 hover:underline"} href={service.domain}>
          {service.domain}
        </a>
      </td>
      <td
        className={`whitespace-nowrap px-6 py-4 py-2 font-semibold ${status === "online" ? "text-green-900 bg-green-100" : "bg-red-100 text-red-900"}`}
      >
        {status}
      </td>
    </tr>
  );
}
