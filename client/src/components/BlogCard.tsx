import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { usernameatom } from "../atoms/usernameatom";
import { Card, CardContent, CardMedia, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

interface BlogProps {
  blogId: string;
  title: string;
  author: string;
  content: string;
  profilePhoto: string;
  imagelink: string;
  upvote: number;
}

interface Response {
  userinfo: {
    username: string;
    profilePhoto: string;
  };
}

export const BlogCard: React.FC<BlogProps> = ({
  blogId,
  title,
  author,
  content,
  profilePhoto,
  imagelink,
  upvote,
}) => {
  const user = useRecoilValue(usernameatom);
  const [authorname,setAuthor] = useState<string>("")
  const [profilePhotolink,setProfilePhoto] = useState<string>("")
  const [like, setLike] = useState<number>(upvote);
  const [blike, setBlike] = useState<boolean>(false);
  const navigate = useNavigate();
  const words = content.split(" ");
  const excerpt =
    words.length > 30 ? words.slice(0, 30).join(" ") + "..." : content;

  useEffect(() => {
  
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get<Response>(`http://localhost:3000/profile/${author}`, {
          withCredentials: true,
        });
         setAuthor(res.data.userinfo.username);
         setProfilePhoto(res.data.userinfo.profilePhoto);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserInfo();
  }, [author]);

  const handleUpvote = async () => {
    try {
      if (!blike) {
        await axios.post(`http://localhost:3000/blog/b/${blogId}`, { upvote: true }, { withCredentials: true });
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
        await axios.post(`http://localhost:3000/blog/b/${blogId}`, { downvote: true }, { withCredentials: true });
        setLike((prev) => prev - 1);
        setBlike(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      onClick={() => {
        if (blogId) {
          navigate(`/blog/${blogId}`);
        }
      }}
      className="cursor-pointer"
    >
      <Card className="w-80 h-96 flex flex-col justify-between bg-white overflow-hidden">
        <div>
          <img className="w-full h-40 object-cover" src={imagelink} alt="blogSnap" />
          <div className="grid grid-cols-4 gap-4 w-full mt-2">
          <img
          className="rounded-full w-12 h-12 ml-2 border-2 border-green-500"
          src={profilePhotolink ? profilePhotolink : "/EmptyImage.png"}
          alt="profilePhoto"
          />

            <div className="flex flex-col col-span-3">
              <p className="text-sm font-bold">r/{authorname}</p>
              <h1 className="font-bold">{title}</h1>
            </div>
          </div>
          <p className="mt-2 text-sm m-2">{excerpt}</p>
        </div>
        <div className="flex justify-start items-center p-4 border-t border-gray-300">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleUpvote();
            }}
            size="small"
          >
            <ThumbUpIcon sx={{ color: "#5d4037" }} className="mr-1" />
          </IconButton>
          <p className="mr-4">{like}</p>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDownvote();
            }}
            size="small"
          >
            <ThumbDownIcon sx={{ color: "#5d4037" }} className="mr-1" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
    
            }}
            size="small"
          >
            <ShareIcon sx={{ color: "#5d4037" }} />
          </IconButton>
        </div>
      </Card>
    </div>
  );
};
