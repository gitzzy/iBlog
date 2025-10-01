import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    const data = {
      name: name,
      username: user,
      password: pass,
    };
    const backurl = "http://localhost:5001";

    axios
      .post(`${backurl}/api/createuser`, data)
      .then((response) => {
        setMessage(response.data.message);

        setTimeout(() => {
          setUser("");
          setMessage("");
          if (!response.data.success) setUser(""); 
        }, 2000);

        if (response.data.success) {
          setTimeout(() => navigate("/"), 2000); 
        }
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.message || "Signup failed. Try again later"
        );

        // fade message after 2 sec
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
  };

  return (
    <div>
      <div className="flex text-white bg-zinc-800 flex-col justify-center h-screen gap-4">
        <div className="flex justify-center text-[32px]">
          Create Your Account
        </div>

        {/* feedback message */}
        {message && (
          <div className="flex justify-center text-red-500">{message}</div>
        )}

        <div className="flex justify-center items-center gap-2">
          Name :{" "}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="username"
            className="p-2 rounded-md"
          ></input>
        </div>
        <div className="flex justify-center items-center gap-2">
          Username :{" "}
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            name="username"
            className="p-2 rounded-md"
          ></input>
        </div>
        <div className="flex justify-center items-center gap-2">
          Password :{" "}
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="password"
            className="p-2 rounded-md"
          ></input>
        </div>
        <div className="flex justify-center items-center gap-18">
          <div className="bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px]">
            <Link to="/">Back to Login</Link>
          </div>
          <div
            onClick={handleSignup}
            className="bg-blue-500 rounded-md w-[100px] flex justify-center items-center h-[40px] cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}
