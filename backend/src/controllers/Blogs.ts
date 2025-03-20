import { Request, Response } from "express";
import { Blog } from "../Schema";

export const Blogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const allBlogs = await Blog.find({});
        if (!allBlogs) {
            res.status(500).json({ msg: "No Blogs found" });
            return;
        }
        res.status(200).json(allBlogs);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ error: e });
    }
};
