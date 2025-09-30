import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState(null);
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const navigate = useNavigate()

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
        // handle success
        navigate('/')
      })
      .catch((error) => {
        // handle error
        console.error("Signup failed:", error.response.data);
        alert('failed to create account')
      });
  };

  return (
    <div>
      <div className="flex text-white bg-zinc-800 flex-col justify-center h-screen gap-4">
        <div className="flex justify-center text-[32px]">
          Create Your Account
        </div>
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
