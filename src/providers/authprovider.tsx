import React, { SetStateAction, useEffect, useState } from "react";
import Loading from "../components/Loading";

type TUser = {
  name: string;
  email: string;
  password: null;
};

type TAuthContext = {
  user: TUser | null;
  setUser: React.Dispatch<SetStateAction<TUser | null>>;
};

const authContext = React.createContext<TAuthContext | null>(null);

export function useAuth(): [
  TUser | null | undefined,
  React.Dispatch<SetStateAction<TUser | null>> | null | undefined
] {
  const ctx = React.useContext(authContext);
  return [ctx?.user, ctx?.setUser];
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function verify_auth() {
      const token = localStorage.getItem("auth-token");
      if (
        (!token || token.length === 0 || !user) &&
        window.location.pathname !== "/login"
      ) {
        console.log(window.location.pathname);
        window.location.href = "/login";
      } else if (token) {
        const response = await fetch(
          "http://localhost:3001/auth/verify-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "x-auth-token": "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          const j_res = await response.json();
          localStorage.setItem("auth-token", j_res.token);
          setUser(j_res.user);
        } else {
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      }
    }

    verify_auth();
  }, [window.location.pathname]);

  const [user, setUser] = useState<TUser | null>(null);

  const values = { user, setUser };

  return (
    <authContext.Provider value={values}>
      {!user && window.location.pathname !== "/login" ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </authContext.Provider>
  );
}
