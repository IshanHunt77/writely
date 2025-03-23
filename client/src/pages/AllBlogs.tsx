import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "../components/BlogCard";
import { useRecoilValue } from "recoil";
import { dpatom } from "../atoms/dpatom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Blog {
  _id: string;
  title: string;
  blog: string;
  author: string;
  imagelink: string;
  upvote: number;
}

export const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const dp = useRecoilValue(dpatom);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get<Blog[]>(
          "https://writely-backend-2fw2.onrender.com/blog/",
          { withCredentials: true }
        );
        setBlogs(blogResponse.data);
      } catch (e) {
        console.log("Error occurred:", e);
      }
    };
    fetchData();
  }, []);

  const getSearch = async () => {
    try {
      const searchRes = await axios.get<Blog[]>(
        `https://writely-backend-2fw2.onrender.com/blog/search?search=${encodeURIComponent(search)}`,
        { withCredentials: true }
      );
      nav("/blogs/result", { state: { blogs: searchRes.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.blog.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white-100">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => nav("/createblog")}
            className="px-6 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
          >
            Create Blog
          </button>
          <div className="flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-96 p-2 border border-amber-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={getSearch}
              className="ml-2 px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
            >
              Search
            </button>
          </div>
          <Navbar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredBlogs.map((bl) => (
            <BlogCard
              key={bl._id}
              blogId={bl._id}
              title={bl.title}
              author={bl.author}
              content={bl.blog}
              imagelink={bl.imagelink}
              profilePhoto={dp.imageUrl || ""}
              upvote={bl.upvote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
