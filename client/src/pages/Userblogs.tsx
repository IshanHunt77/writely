import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "../components/BlogCard";
import { useRecoilState } from "recoil";
import { dpatom } from "../atoms/dpatom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Blog {
  _id: string;
  title: string;
  blog: string;
  author: string;
  profilePhoto: string;
  imagelink: string;
  upvote: number;
}

export const Userblogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [dp, setDP] = useRecoilState(dpatom);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get<Blog[]>("https://writely-backend-2fw2.onrender.com/blog/userblogs", {
          withCredentials: true,
        });
        setBlogs(blogResponse.data);

        const profileRes = await axios.get<{ profilePhoto: string }>(
          "https://writely-backend-2fw2.onrender.com/profile/profilephoto",
          { withCredentials: true }
        );
        setDP({ file: null, imageUrl: profileRes.data.profilePhoto });
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, [setDP]);

  const getSearch = async () => {
    try {
      const searchRes = await axios.post<Blog[]>(
        "https://writely-backend-2fw2.onrender.com/blog/search",
        { search },
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
          <div className="flex flex-1 justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-96 p-2 border border-amber-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mr-2"
            />
            <button
              onClick={getSearch}
              className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
            >
              Search
            </button>
          </div>
          <Navbar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredBlogs.map((bl) => (
            <BlogCard
              blogId={bl._id}
              author={bl.author}
              key={bl._id}
              title={bl.title}
              content={bl.blog}
              imagelink={bl.imagelink}
              profilePhoto={dp.imageUrl || bl.profilePhoto || ""}
              upvote={bl.upvote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
