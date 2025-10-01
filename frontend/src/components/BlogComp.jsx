import React, { useEffect, useRef, useState } from "react";

export default function BlogComp({blog}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 border mt-4 p-4">
        {/* username div */}
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2 items-center p-4">
            <img
              src="https://icons.veryicon.com/png/o/education-technology/education-cloud/username-1.png"
              className="w-[40px] rounded-[50%]"
            />

            <div className="flex flex-col">
              <div className="text-black">{blog.authorName}</div>
              <div className="text-zinc-500">@{blog.authorUsername}</div>
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
                <div className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-white">
                  View Profile
                </div>
                <div className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-white">
                  Edit
                </div>
                <div className="px-4 py-2 hover:bg-zinc-100 cursor-pointer text-red-500">
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Blog content */}
        <div className="flex flex-col items-center">
          <div className="font-bold text-[18px]">{blog.title}</div>
          <div className="w-[80%] flex justify-center">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
}
