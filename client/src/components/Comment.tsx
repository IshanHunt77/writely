import { useState } from "react";
import { useRecoilValue } from "recoil";
import { usernameatom } from "../atoms/usernameatom";
import { Socket } from "socket.io-client";

interface CommentProps {
  socket: Socket | null;
  blogId: string | undefined;
}

export const Comment = ({ socket, blogId }: CommentProps) => {
  const [comment, setComment] = useState("");
  const user = useRecoilValue(usernameatom);
  const username = typeof user === "object" && user !== null ? user.username : user;

  const handleComment = () => {
    if (!comment.trim() || !blogId || !socket) return;
    socket.emit("new-comment", { comment, blogId, username });
    setComment("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
      />
      <button
        onClick={handleComment}
        className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900"
      >
        Send
      </button>
    </div>
  );
};
