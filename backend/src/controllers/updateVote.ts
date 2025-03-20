import { Request, Response } from "express";
import { Blog, Comments } from "../Schema";

interface Type {
  blogId: string;
  commentId: string;
  upvote?: string;
  downvote?: string;
}

export const updateVoteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId as unknown as Type;
    const { upvote, downvote } = req.body as Type;

    if (!blogId) {
      res.status(400).json({ msg: "BlogId required" });
      return;
    }

    if (upvote) {
      await Blog.findByIdAndUpdate(blogId, { $inc: { upvote: 1 } });
    } else if (downvote) {
      await Blog.findByIdAndUpdate(blogId, { $inc: { downvote: -1 } });
    }

    res.status(200).json({ msg: "Vote updated successfully" });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateVoteComment = async (req: Request, res: Response) => {
    try {
      const { upvote, downvote,commentId } = req.body as Type;
  
      if (!commentId) {
        res.status(400).json({ msg: "CommentId required" });
        return;
      }
  
      if (upvote) {
        await Comments.findByIdAndUpdate(commentId, { $inc: { upvote: 1 } });
      } else if (downvote) {
        await Comments.findByIdAndUpdate(commentId, { $inc: { downvote: -1 } });
      }
  
      res.status(200).json({ msg: "Vote updated successfully" });
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
