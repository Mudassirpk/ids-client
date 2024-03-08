import axios from "axios";
import React, { SetStateAction, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  repo: { full_name: string; name: string };
  selectedRepo: string | null;
  setSelectedRepo: React.Dispatch<SetStateAction<string | null>>;
  index: number;
};

export default function RepoRow({
  index,
  repo,
  selectedRepo,
  setSelectedRepo,
}: Props) {
  const [siteType, setSiteType] = useState("");
  const navigate = useNavigate();
  async function get_ssh_url(name: string) {
    const response = await axios.post(
      "http://localhost:3001/github/get-ssh-url",
      {
        name,
      },
      {
        headers: {
          "x-auth-token": "Bearer " + localStorage.getItem("auth-token"),
        },
      }
    );
    if (response.status === 200) {
      const url_params = new URLSearchParams();
      url_params.append("ssh_url", response.data);
      url_params.append("repo_name", name);
      if (siteType.length > 0 && siteType === "react-frontend") {
        navigate("/deploy-react-frontend?" + url_params.toString());
      } else if (siteType.length > 0 && siteType === "node-backend") {
        navigate("/deploy-node-backend?" + url_params.toString());
      }
    }
  }

  return (
    <tr
      key={repo.name}
      className={`${
        selectedRepo && selectedRepo === repo.name
          ? "border-2 border-blue-800"
          : null
      } border-b text-lg text-black`}
    >
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {selectedRepo && selectedRepo === repo.name ? (
          <IoCheckmarkDoneCircle className="text-3xl text-green-700" />
        ) : (
          <div
            className="w-5 h-5 hover:bg-gray-100 rounded-lg bg-gray-50 border border-gray-300"
            onClick={() => {
              setSelectedRepo(repo.name);
              setSiteType("");
            }}
          ></div>
        )}
      </td>
      <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
      <td className="whitespace-nowrap px-6 py-4">{repo.full_name}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <select
          className="px-2 py-2 rounded-lg outline-none cursor-pointer"
          id="site-types"
          name="Site Types"
          value={siteType}
          onChange={(e) => setSiteType(e.target.value)}
        >
          <option value="">Select Site Type</option>
          <option value="react-frontend">React Frontend</option>
          <option value="node-backend">Node Backend</option>
        </select>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          disabled={!selectedRepo}
          onClick={() => get_ssh_url(repo.name)}
          className="px-2 py-2 rouned-lg hover:bg-blue-800 hover:text-white hover:border-none border-2 border-gray-700 text-lg rounded-lg"
        >
          Deploy
        </button>
      </td>
    </tr>
  );
}
