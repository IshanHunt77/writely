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
  imagelink: string;
  upvote: number;
}

export const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [dp, setDP] = useRecoilState(dpatom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get<Blog[]>(
          "https://writely-backend-2fw2.onrender.com/blog/",
          { withCredentials: true }
        );
        setBlogs(blogResponse.data);

        const profileRes = await axios.get<{ profilePhoto: string }>(
          "https://writely-backend-2fw2.onrender.com/profile/profilephoto",
          { withCredentials: true }
        );
        setDP({ file: null, imageUrl: profileRes.data.profilePhoto });
      } catch (e) {
        console.error("Error occurred:", e);
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
      navigate("/blogs/result", { state: { blogs: searchRes.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.blog.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/createblog")}
            className="px-6 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
          >
            Create Blog
          </button>
          <div className="flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
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
              key={bl._id}
              blogId={bl._id}
              author={bl.author}
              title={bl.title}
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
