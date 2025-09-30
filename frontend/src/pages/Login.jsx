import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../components/UserContext";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(userContext);
  const backurl = "http://localhost:5001";
  const navigate = useNavigate();

  const handleSignin = () => {
    const data = { username, password };
    axios
      .post(`${backurl}/api/login`, data)
      .then((response) => {
        setUser(response.data.username);
        localStorage.setItem('user',response.data.username)
        localStorage.setItem('name',response.data.name)
        // alert(response.data.message);
        if (response.data.success) {
        navigate("/api/home")
        }
      })
      .catch((err) =>
        alert("Login failed: " + err.response?.data?.msg || "Server error")
      );
  };

  return (
    <div className="flex text-white bg-zinc-800 flex-col justify-center h-screen gap-4">
      <div className="flex justify-center text-[32px]">Login Page</div>

      {message && (
        <div className="flex justify-center text-red-500">{message}</div>
      )}

      <div className="flex justify-center items-center gap-2">
        Username :{" "}
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          className="p-2 rounded-md"
        ></input>
      </div>
      <div className="flex justify-center items-center gap-2">
        Password :{" "}
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          className="p-2 rounded-md"
        ></input>
      </div>
      <div className="flex justify-center items-center gap-18">
        <div
          onClick={handleSignin}
          className="cursor-pointer bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px]"
        >
          Login
        </div>
        <Link to="/api/signup">
        <div className="bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px]">
          Sign Up
        </div>
        </Link>
      </div>
    </div>
  );
}
