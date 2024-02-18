import axios from "axios";
export async function getServices(type: string) {
  return axios.get(`http://localhost:3001/${type}-services`, {
    headers: {
      "x-auth-token": "Bearer" + localStorage.getItem("auth-token"),
    },
  });
}
