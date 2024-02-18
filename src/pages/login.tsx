import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";
import { useAuth } from "../providers/authprovider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [_user, setUser] = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isError, refetch, isSuccess, data } = useQuery({
    queryKey: ["auth-login"],
    queryFn: login,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  async function login() {
    return await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(credentials),
    });
  }

  useEffect(() => {
    async function setup_auth() {
      if (isSuccess) {
        const auth_data = await data.json();
        localStorage.setItem("auth-token", auth_data.token);
        if (setUser) {
          setUser(auth_data.user);
          navigate("/");
        }
      }
    }

    setup_auth();
  }, [isSuccess]);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          refetch();
        }}
        className="w-[400px] flex flex-col gap-2 p-4 rounded-lg bg-gray-100"
      >
        <h1 className="text-blue-700 text-3xl font-bold text-center">Login</h1>
        <label
          htmlFor="email"
          className="flex flex-col gap-2 items-start w-full"
        >
          Email
          <input
            required={true}
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            type="email"
            placeholder="example@gmail.com"
            id="email"
            className="px-4 py-2 rounded-lg w-full"
          />
        </label>
        <label
          htmlFor="password"
          className="flex flex-col gap-2 items-start w-full"
        >
          Password
          <input
            required={true}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            type="password"
            placeholder="*********"
            id="password"
            className="px-4 py-2 rounded-lg w-full"
          />
        </label>
        <button
          disabled={isLoading}
          type="submit"
          className={`${
            isLoading
              ? "bg-gray-200 hover:bg-gray-200 cursor-none"
              : "bg-blue-700 hover:bg-blue-600"
          } py-2 text-white rounded-lg font-semibold cursor-pointer`}
        >
          {isLoading ? "Please wait ...." : "Login"}
        </button>
        <div className="w-full">
          {isError ? <Error message="Failed to login ...." /> : null}
        </div>
      </form>
    </main>
  );
}
