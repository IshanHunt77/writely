import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useRecoilState } from "recoil";
import { dpatom } from "../atoms/dpatom";
import Navbar from "../components/Navbar";

interface Blog {
  blogId: string;
  author: string;
  title: string;
  blog: string;
  profilePhoto: string;
  imagelink: string;
  upvote: number;
}

export const Search = () => {
  const location = useLocation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [dp, setDP] = useRecoilState(dpatom);

  useEffect(() => {
    if (location.state && (location.state as any).blogs) {
      setBlogs((location.state as any).blogs);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Create Blog
          </button>
          <div className="flex flex-1 mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 mr-2"
            />
            <button className="px-4 py-2 bg-amber-800 text-white rounded-r-md hover:bg-amber-900">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((bl, index) => (
            <BlogCard
              key={index}
              blogId={bl.blogId}
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
