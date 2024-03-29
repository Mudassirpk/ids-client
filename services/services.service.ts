import axios from "axios";
export async function getServices(type: string) {
  return axios.get(`api/services/${type}-services`, {
    headers: {
      "x-auth-token": "Bearer " + localStorage.getItem("auth-token"),
    },
  });
}
