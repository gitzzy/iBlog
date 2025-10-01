import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

export default function EditBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const backurl = "http://localhost:5001";
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${backurl}/api/blog/${id}`) 
      .then((res) => {
        if (res.data.success) {
          setTitle(res.data.blog.title);
          setContent(res.data.blog.content);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch blog data");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title: title,
      content: content,
    };

    axios
      .put(`${backurl}/api/updateblog/${id}`, updatedData) // PUT is correct here
      .then((res) => {
        if (res.data.success) {
          alert("Blog updated successfully!");
          navigate("/api/myblog"); // redirect to your blog list page
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update blog");
      });
  };

  return (
    <>
      <Home />
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

        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
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
            Update
          </button>
        </form>
      </div>
    </>
  );
}
