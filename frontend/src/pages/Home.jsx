import React, { useContext } from "react";
import { userContext } from "../components/UserContext";
import Blogs from "../components/Blogs";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, setUser, logout } = useContext(userContext);
  const username = localStorage.getItem("user");
  const name = localStorage.getItem("name");

  return (
    <div className="">
      <nav className="bg-zinc-700 w-full h-[60px] flex text-white  items-center px-4 gap-4 justify-between fixed">
        <div className="font-bold text-[24px] flex gap-8">
          <Link to="/api/home">
            <div className="cursor-pointer">Home</div>
          </Link>
          <div className="cursor-pointer">Dashboard</div>
          <Link to="/api/myblog">
            <div className="cursor-pointer">MyBlog</div>
          </Link>
          <Link to="/api/createblog">
            <div className="cursor-pointer">Create Blog</div>
          </Link>
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
