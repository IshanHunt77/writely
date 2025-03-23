import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import Navbar from "../components/Navbar";

interface Blog {
  blogId: string;
  author: string;
  title: string;
  blog: string;
  imagelink: string;
  upvote: number;
}

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (location.state && (location.state as any).blogs) {
      setBlogs((location.state as any).blogs);
    }
  }, [location]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate("/blogs/result", { state: { search: searchQuery } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/createblog")}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create Blog
          </button>
          <div className="flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-amber-800 text-white rounded-r-md hover:bg-amber-900"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((bl) => (
            <BlogCard
              key={bl.blogId}
              blogId={bl.blogId}
              author={bl.author}
              title={bl.title}
              content={bl.blog}
              imagelink={bl.imagelink}
              upvote={bl.upvote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
