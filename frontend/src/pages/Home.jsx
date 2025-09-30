import React, { useContext } from "react";
import { userContext } from "../components/UserContext";

export default function Home() {
  const { user, setUser, logout } = useContext(userContext);
  const username = localStorage.getItem("user");
  const name = localStorage.getItem("name");

  return (
    <div className="">
      <nav className="bg-zinc-700 w-full h-[60px] flex text-white  items-center px-4 gap-4 justify-between">
        <div className="font-bold text-[24px] flex gap-8">
          <div className="cursor-pointer">Home</div>
          <di className="cursor-pointer">Dashboard</di>
        </div>
        <div className="flex items-center gap-8">
            <div className="text-[18px] cursor-pointer">{name}</div>
          <div
            className="cursor-pointer bg-red-500 w-[80px] h-[40px] flex items-center justify-center rounded-md"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      </nav>
    </div>
  );
}
