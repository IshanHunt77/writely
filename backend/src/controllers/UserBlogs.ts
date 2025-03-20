import { Request, Response } from "express";
import { Blog } from "../Schema";

interface CustomReq extends Request {
    userId?: string;
}

export const UserBlogs = async (req: CustomReq, res: Response): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(401).json({ msg: "User not Authorized" });
            return;
        }
        const blogs = await Blog.find({ author: req.userId });
        if (!blogs || blogs.length === 0) {
            res.status(404).json({ msg: "Blogs not Found" });
            return;
        }
        res.status(200).json(blogs);
    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
