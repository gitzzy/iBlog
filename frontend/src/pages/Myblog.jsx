
import { useEffect, useState } from "react";
import BlogComp from "../components/BlogComp";
import axios from "axios";
import Home from "./Home";

export default function Myblog() {
const [blogs,setBlog] = useState([]);
const user = localStorage.getItem('user')
const backurl = "http://localhost:5001";
 useEffect(() => {
    axios
    .get(`${backurl}/api/myblog/${user}`)
    .then((res) => {
        if (res.data.success) {
        const sortedBlogs = res.data.myblog.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlog(sortedBlogs);
    }
    })
    .catch((err) => console.error("Failed to fetch blogs", err));
  },[])

  return (
    <>
    <Home/>
    <div className="flex">
      <div className="w-[30%]"></div>
      <div className="w-[60%] p-4 mt-10">
        {/* //Blog outer */}
        {blogs.length === 0 ? (<div>Failed to fetch blogs</div>):
        blogs.map((blog) => (
            <BlogComp key={blog._id} blog={blog}/>
        )) }
      </div>
    </div>
    </>
  );
}
