import { useState } from "react";
import { ChooseFile } from "./ChooseFile";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { imageatom } from "../atoms/imageatom";
import { usernameatom } from "../atoms/usernameatom";
import { useNavigate } from "react-router-dom";

export const PostBlog = () => {
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const imageData = useRecoilValue(imageatom);
  const username = useRecoilValue(usernameatom);
  const nav = useNavigate();

  const handleBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = imageData.imageUrl || "";
      if (imageData.file) {
        const formData = new FormData();
        formData.append("image", imageData.file);
        const imgRes = await axios.post<{ imageLink: string }>(
          "https://writely-backend-2fw2.onrender.com/blog/upload",
          formData
        );
        imageUrl = `https://writely-backend-2fw2.onrender.com${imgRes.data.imageLink}`;
      }

      const response = await axios.post(
        "https://writely-backend-2fw2.onrender.com/blog/createBlogs",
        {
          title,
          blog,
          imagelink: imageUrl,
        },
        { withCredentials: true }
      );

      console.log("Blog created:", response.data);
      nav(username ? `/${username}/blogs` : "/");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a Blog
        </h1>
        <form onSubmit={handleBlog} className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 h-12 px-4 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            {imageData?.imageUrl && (
              <img
                src={imageData.imageUrl}
                alt="Blog Thumbnail"
                className="w-16 h-16 rounded-md object-cover"
              />
            )}
          </div>
          <textarea
            placeholder="Start your blog..."
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="w-full h-48 p-4 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
          />
          <div className="flex items-center justify-end gap-4">
            <div title="Image">
              <ChooseFile />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
