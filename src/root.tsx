import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "./providers/authprovider.tsx";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const [user, setUser] = useAuth();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("auth-token");
    if (setUser) {
      setUser(null);
    }
    navigate("/login");
  }

  return (
    <>
      <header
        className={
          "w-full px-4 border-b-2 border-blue-800 pb-2 bg-blue-100 flex justify-center gap-2"
        }
      >
        <Link
          to={"/"}
          className={`${window.location.pathname === "/" ? "bg-white text-blue-800 font-bold" : " bg-blue-700 text-white"} px-4 py-2 rounded-bl-lg rounded-br-lg`}
        >
          Home
        </Link>{" "}
        <Link
          to={"/repos"}
          className={`${window.location.pathname === "/repos" ? "bg-white text-blue-800 font-bold" : " bg-blue-700 text-white"} px-4 py-2 rounded-bl-lg rounded-br-lg`}
        >
          See All Repos
        </Link>
        <Link
          to={"/deploy-react-frontend"}
          className={`${window.location.pathname === "/deploy-react-frontend" ? "bg-white text-blue-800 font-bold" : " bg-blue-700 text-white"} px-4 py-2 rounded-bl-lg rounded-br-lg`}
        >
          Deploy React Frontend
        </Link>
        <Link
          className={`${window.location.pathname === "/deploy-node-backend" ? "bg-white text-blue-800 font-bold" : " bg-blue-700 text-white"} px-4 py-2 rounded-bl-lg rounded-br-lg`}
          to={"/deploy-node-backend"}
        >
          Deploy Node Backend
        </Link>
        <Link
          className={`${window.location.pathname === "/integrate" ? "bg-white text-blue-800 font-bold" : " bg-blue-700 text-white"} px-4 py-2 rounded-bl-lg rounded-br-lg`}
          to={"/integrate"}
        >
          Integrate
        </Link>
        <button
          onClick={logout}
          className={
            "px-4 py-2 rounded-bl-lg rounded-br-lg bg-blue-200 text-blue-800 font-bold hover:bg-blue-300"
          }
        >
          Logout
        </button>
        <div
          className={
            "px-2 py-2 rounded-bl-lg rounded-br-lg flex gap-2 items-center border-l-2 border-r-2 border-b-2 border-br-2 border-white bg-blue-200 text-blue-800 font-bold text-xl"
          }
        >
          <div
            className={
              "rounded-full bg-blue-800 w-[20px] aspect-square border-white border-2"
            }
          ></div>
          {user?.name}
        </div>
      </header>
      <Outlet />
    </>
  );
}
