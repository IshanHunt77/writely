import { Request, Response } from "express";
import { Blog } from "../Schema";

export const searchBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search as string;
    if (!search) {
      res.status(400).json({ error: "Search term is required" });
      return;
    }
    // Assuming tags is an array of strings in your schema.
    const blogs = await Blog.find({ tags: { $in: [search] } });
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
