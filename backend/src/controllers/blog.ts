import { Request, Response } from "express";
import { Blog } from "../Schema";

export const blog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId as string;

    if (!blogId) {
      res.status(400).json({ msg: "BlogId required" });
      return;
    }

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
      res.status(404).json({ msg: "Blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
