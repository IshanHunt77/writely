import { useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { ChooseFile } from "./ChooseFile";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { imageatom } from "../atoms/imageatom";
import { usernameatom } from "../atoms/usernameatom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

export const PostBlog = () => {
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const imageData = useRecoilValue(imageatom);
  const username = useRecoilValue(usernameatom);
  const nav = useNavigate();

  const generateTag = async (): Promise<string> => {
    const genAI = new GoogleGenerativeAI("AIzaSyBKXpAxfxI-_880RbuBXD4cmB3eTdoh3LQ");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Provide a single-word hashtag summarizing the essence of this blog: ${blog}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  };

  const handleBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (imageData.file) {
        const formData = new FormData();
        formData.append("image", imageData.file);
        const imgRes = await axios.post<{ imageLink: string }>(
          "http://localhost:3000/blog/upload",
          formData
        );
        imageUrl = `http://localhost:3000${imgRes.data.imageLink}`;
      }
      const generatedTag = await generateTag();
      setTag(generatedTag);
      const response = await axios.post(
        "http://localhost:3000/blog/createBlogs",
        {
          title,
          blog,
          imagelink: imageUrl || imageData.imageUrl,
          tags: generatedTag,
        },
        { withCredentials: true }
      );
      console.log("Blog created:", response.data);
      nav(`/${username}/blogs`);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a Blog
        </h1>
        <form onSubmit={handleBlog} className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 h-12 px-4 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
            {imageData?.imageUrl && (
              <img
                src={imageData.imageUrl}
                alt="Blog Thumbnail"
                className="w-16 h-16 rounded-md object-cover"
              />
            )}
          </div>
          <textarea
            placeholder="Start your blog..."
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="w-full h-48 p-4 border border-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
          />
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              title="Submarise"
              className="flex items-center text-4xl text-gray-600"
            >
              <AcUnitIcon />
            </button>
            <div title="Image">
              <ChooseFile />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
