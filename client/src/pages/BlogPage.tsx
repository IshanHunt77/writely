import { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "../components/Blog";
import { Comment } from "../components/Comment";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { RelatedCard } from "../components/RelatedBlogCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Card } from "@mui/material";

interface CommentType {
    _id: string;
    blogId: string;
    username: string;
    comment: string;
    createdAt: string;
  }
  

export const BlogPage = () => {
  const nav = useNavigate();
  const { blogId } = useParams();
  const [like, setLike] = useState(0);
  console.log(blogId)
  const [search, setSearch] = useState("");
  const [blog, setBlog] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!blogId) return;

    const fetchData = async () => {
      try {
        const blogRes = await axios.get(`http://localhost:3000/blog/${blogId}`, {
          withCredentials: true,
        });
        setBlog(blogRes.data);

        const commentsRes = await axios.get<CommentType[]>(`http://localhost:3000/blog/comments/${blogId}`, {
          withCredentials: true,
        });
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Error fetching blog or comments:", error);
      }
    };

    fetchData();
  }, [blogId]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("WebSocket connected", newSocket.id);
    });

    newSocket.on("comment-added", (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSearch = async () => {
    try {
      const searchRes = await axios.post(
        "http://localhost:3000/blog/search",
        { search },
        { withCredentials: true }
      );
      nav("/blogs/result", { state: { blogs: searchRes.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white-100">
      <div className=" px-4 py-6">
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
              className="w-96 ml-80 p-2 border border-amber-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-amber-800 text-white rounded-r-md hover:bg-amber-900"
            >
              Search
            </button>
           
          </div>
          <Navbar />
        </div>

        
        <div className="bg-white-100 shadow-lg rounded-lg p-8 mb-8">
  {blog ? (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Blog blog={blog} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended</h2>
        <RelatedCard />
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500">Loading blog...</div>
  )}
</div>


       
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <Comment socket={socket} blogId={blogId} />

          <div className="mt-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  <Card key={index} className="p-4 shadow-md rounded-lg">
                  <div className="flex flex-col">
                  <p className="font-bold text-gray-800">{comment.author || "ishan77"}</p>

                    <p className="text-gray-800">{comment.comment}</p>
                    <div className="flex items-center gap-2 mt-2">
                      
                        <ThumbUpIcon sx={{ color: "#5d4037" }} />
                      
                      
                        <ThumbDownIcon sx={{ color: "#5d4037" }} />
                      
                    </div>
                  </div>
                </Card>
                  
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
