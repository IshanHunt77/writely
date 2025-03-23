import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { usernameatom } from "../atoms/usernameatom";
import { Card, CardContent, CardMedia, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  blog: string;
  profilePhoto: string;
  imagelink: string;
  upvote: number;
}

export const RelatedCard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [id: string]: number }>({});
  const [voted, setVoted] = useState<{ [id: string]: boolean }>({});
  const user = useRecoilValue(usernameatom);
  const username =
    typeof user === "object" && user !== null ? user.username || "" : user;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get<Blog[]>("https://writely-backend-2fw2.onrender.com/blog/userblogs", { withCredentials: true });
        setBlogs(res.data);
        const initialLikes: { [id: string]: number } = {};
        res.data.forEach((b) => {
          initialLikes[b._id] = b.upvote;
        });
        setLikeCounts(initialLikes);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleUpvote = async (id: string, currentUpvote: number) => {
    try {
      if (!voted[id]) {
        await axios.post(`https://writely-backend-2fw2.onrender.com/blog/b/${id}`, { upvote: true }, { withCredentials: true });
        setLikeCounts((prev) => ({ ...prev, [id]: currentUpvote + 1 }));
        setVoted((prev) => ({ ...prev, [id]: true }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownvote = async (id: string, currentUpvote: number) => {
    try {
      if (!voted[id]) {
        await axios.post(`https://writely-backend-2fw2.onrender.com/blog/b/${id}`, { downvote: true }, { withCredentials: true });
        setLikeCounts((prev) => ({ ...prev, [id]: currentUpvote - 1 }));
        setVoted((prev) => ({ ...prev, [id]: true }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getExcerpt = (text: string) => {
    const words = text.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : text;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {blogs.slice(0, 2).map((b) => (
        <div key={b._id} onClick={() => navigate(`/blog/${b._id}`)} className="cursor-pointer">
          <Card className="flex flex-row shadow-lg rounded-lg overflow-hidden w-[500px] h-[160px] hover:bg-amber-100">
            <div className="flex items-center justify-center w-[120px] h-full bg-gray-100">
              <CardMedia
                component="img"
                image={b.imagelink}
                alt={b.title}
                className="w-20 h-20 object-cover"
              />
            </div>
            <CardContent className="flex-1 p-4">
              <h2 className="text-lg font-bold mb-1">{b.title}</h2>
              <p className="text-sm text-gray-600 mb-1">By {username || "Anonymous"}</p>
              <p className="text-gray-800 mb-2">{getExcerpt(b.blog)}</p>
              <div className="flex items-center">
                <IconButton onClick={(e) => { e.stopPropagation(); handleUpvote(b._id, likeCounts[b._id] || b.upvote); }} size="small">
                  <ThumbUpIcon sx={{ color: "#5d4037" }} />
                </IconButton>
                <span className="mr-2 text-sm">{likeCounts[b._id] || b.upvote}</span>
                <IconButton onClick={(e) => { e.stopPropagation(); handleDownvote(b._id, likeCounts[b._id] || b.upvote); }} size="small">
                  <ThumbDownIcon sx={{ color: "#5d4037" }} />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
