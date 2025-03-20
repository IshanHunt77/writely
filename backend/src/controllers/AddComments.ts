import { Request, Response } from "express";
import { Comments } from "../Schema";

interface CustomReq extends Request {
  username?: string;
}

export const AddComments = async (req: CustomReq, res: Response) => {
  try {
    const { blogId } = req.body;
    const { comment } = req.body;
    const username = req.username;

    if (!blogId || !comment) {
      return res.status(400).json({ msg: "blogId and comment are required" });
    }

    if (!username) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const newComment = await Comments.create({ blogId, author: username, comment });
    console.log("Comment added successfully")
    res.status(201).json({ msg: "Comment added successfully", newComment });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
