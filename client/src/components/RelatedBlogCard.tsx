import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  blog: string;
  imagelink: string;
  upvote: number;
}

export const RelatedCard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [id: string]: number }>({});
  const [voted, setVoted] = useState<{ [id: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get<Blog[]>(
          "https://writely-backend-2fw2.onrender.com/blog/userblogs",
          { withCredentials: true }
        );
        setBlogs(res.data);
        const initialLikes = res.data.reduce(
          (acc, b) => ({ ...acc, [b._id]: b.upvote }),
          {} as { [id: string]: number }
        );
        setLikeCounts(initialLikes);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleVote = async (id: string, type: "upvote" | "downvote") => {
    if (voted[id]) return;

    try {
      const updateValue = type === "upvote" ? 1 : -1;
      await axios.post(
        `https://writely-backend-2fw2.onrender.com/blog/b/${id}`,
        { [type]: true },
        { withCredentials: true }
      );
      setLikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + updateValue }));
      setVoted((prev) => ({ ...prev, [id]: true }));
    } catch (e) {
      console.log(e);
    }
  };

  const getExcerpt = (text: string) => {
    return text.split(" ").length > 10
      ? text.split(" ").slice(0, 10).join(" ") + "..."
      : text;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {blogs.slice(0, 2).map((b) => (
        <div key={b._id} className="cursor-pointer">
          <Card
            onClick={() => navigate(`/blog/${b._id}`)}
            className="flex flex-row shadow-lg rounded-lg overflow-hidden w-[500px] h-[160px] hover:bg-amber-100"
          >
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
              <p className="text-gray-800 mb-2">{getExcerpt(b.blog)}</p>
              <div className="flex items-center">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(b._id, "upvote");
                  }}
                  size="small"
                >
                  <ThumbUpIcon sx={{ color: "#5d4037" }} />
                </IconButton>
                <span className="mr-2 text-sm">{likeCounts[b._id] || 0}</span>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVote(b._id, "downvote");
                  }}
                  size="small"
                >
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
