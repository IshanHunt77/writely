import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { usernameatom } from "../atoms/usernameatom";
import { dpatom } from "../atoms/dpatom";
import { Card } from "./ui/card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

interface BlogProps {
  blog: {
    title: string;
    blog: string;
    author: string; // author id
    upvote: number;
    imagelink: string;
    createdAt: string;
    blogId: string;
  };
}

interface Response {
  userinfo: {
    username: string;
    profilePhoto: string;
  };
}

export const Blog = ({ blog }: BlogProps) => {
  const user = useRecoilValue(usernameatom);
  const profile = useRecoilValue(dpatom);
  const [like, setLike] = useState<number>(blog.upvote);
  const [blike, setBlike] = useState<boolean>(false);
  const [authorname, setAuthor] = useState<string>("");
  const [profilePhotolink, setProfilePhoto] = useState<string>("");
  const navigate = useNavigate();
  const words = blog.blog.split(" ");
  const excerpt =
    words.length > 30 ? words.slice(0, 30).join(" ") + "..." : blog.blog;

  useEffect(() => {
    if (blog.author) {
      const fetchUserInfo = async () => {
        try {
          const res = await axios.get<Response>(
            `https://writely-backend-2fw2.onrender.com/profile/${blog.author}`,
            { withCredentials: true }
          );
          setAuthor(res.data.userinfo.username);
          setProfilePhoto(res.data.userinfo.profilePhoto);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserInfo();
    }
  }, [blog.author]);

  const handleUpvote = async () => {
    try {
      if (!blike) {
        await axios.post(
          `https://writely-backend-2fw2.onrender.com/blog/b/${blog.blogId}`,
          { upvote: true },
          { withCredentials: true }
        );
        setLike((prev) => prev + 1);
        setBlike(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownvote = async () => {
    try {
      if (!blike) {
        await axios.post(
          `https://writely-backend-2fw2.onrender.com/blog/b/${blog.blogId}`,
          { downvote: true },
          { withCredentials: true }
        );
        setLike((prev) => prev - 1);
        setBlike(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-128">
      <Card className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex flex-col justify-center gap-2 md:max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
          <div className="flex items-center gap-4">
            <img
              className="rounded-full w-12 h-12 border-2 border-green-500 object-cover"
              src={profilePhotolink || profile.imageUrl || "/EmptyImage.png"}
              alt="profilePhoto"
            />
            <p className="font-bold">r/{authorname || user.username || "Anonymous"}</p>
          </div>
          <p className="mt-2 text-sm">{excerpt}</p>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUpvote();
              }}
              className="flex items-center"
            >
              <ThumbUpIcon sx={{ color: "#5d4037", fontSize: 28 }} />
            </button>
            <span className="text-lg text-gray-700">{like}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownvote();
              }}
              className="flex items-center"
            >
              <ThumbDownIcon sx={{ color: "#5d4037", fontSize: 28 }} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center"
            >
              <ShareIcon sx={{ color: "#5d4037", fontSize: 28 }} />
            </button>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-1/3">
          <img
            src={blog.imagelink}
            alt="Blog"
            className="w-full h-40 object-cover rounded-md shadow-sm"
          />
        </div>
      </Card>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{blog.blog}</p>
      </div>
    </div>
  );
};
