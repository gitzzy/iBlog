
import { useEffect, useState } from "react";
import BlogComp from "./BlogComp";
import axios from "axios";

export default function Blogs() {
const [blogs,setBlog] = useState([]);
const backurl = "http://localhost:5001";
 useEffect(() => {
    axios
    .get(`${backurl}/api/blogs`)
    .then((res) => {
        if(res.data.success){
            setBlog(res.data.blogs)
        }
    })
    .catch((err) => console.error("Failed to fetch blogs", err));
  },[])

  return (
    <div className="flex">
      <div className="w-[30%]"></div>
      <div className="w-[60%] p-4 mt-10">
        {/* //Blog outer */}
        {blogs.length === 0 ? (<div>Failed to fetch blogs</div>):
        blogs.map((blog) => (
            <BlogComp blog={blog}/>
        )) }
      </div>
    </div>
  );
}
