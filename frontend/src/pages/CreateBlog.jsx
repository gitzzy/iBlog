import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const backurl = "http://localhost:5001";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      authorName: localStorage.getItem('name'),
      authorUsername: localStorage.getItem('user'),
      title: title,
      content: content,
    };

    axios
      .post(`${backurl}/api/createblog`, data)
      .then((res) => {
        if (res.data.success) {
          alert("Blog created successfully!");
          setTitle("");
          setContent("");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create blog");
      });
  };

  return (
    <>
    <Home/>
    <div className="flex flex-col items-center p-8 bg-zinc-100 min-h-screen">
      {/* Back Button */}
      <div className="self-start mb-4 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-lg"
      >
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md w-full"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded-md w-full h-40"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
    </>
  );
}
