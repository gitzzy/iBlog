import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogComp({ blog }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const backurl = "http://localhost:5001";

  // Helper function for time ago
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 31104000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31104000)} years ago`;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete blog
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`${backurl}/api/deleteblog/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Blog deleted successfully!");
            navigate(0); // reload current page to update blog list
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete blog");
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 border rounded-xl mt-4 p-4 bg-zinc-600 text-white">
        {/* username div */}
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2 items-center p-4">
            <img
              src="https://icons.veryicon.com/png/o/education-technology/education-cloud/username-1.png"
              className="w-[40px] rounded-[50%]"
            />

            <div className="flex flex-col">
              <div className="text-black">{blog.authorName}</div>
              <div className="text-green-500">@{blog.authorUsername}</div>
            </div>
          </div>

          {/* Options menu */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer px-2 py-1"
            >
              •••
            </div>

            {open && (
              <div className="absolute top-full right-0 mt-2 bg-zinc-800 shadow-lg rounded-md w-40 py-2 border">
                <div className="px-4 py-2 cursor-pointer text-white">
                  View Profile
                </div>

                {/* Edit link with blog ID */}
                <Link to={`/api/editblog/${blog._id}`}>
                  <div className="px-4 py-2 cursor-pointer text-white">
                    Edit
                  </div>
                </Link>

                <div
                  className="px-4 py-2 cursor-pointer text-red-500"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Blog content */}
        <div className="flex flex-col items-center">
          <div className="font-bold text-[18px]">{blog.title}</div>
          <div className="w-[80%] flex justify-center">{blog.content}</div>
        </div>

        <div>
          <div className="text-white text-sm mt-2">
            Posted {timeAgo(blog.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
