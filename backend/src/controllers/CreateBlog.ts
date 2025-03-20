import { Request, Response } from "express";
import { Blog } from "../Schema";

interface CustomRequest extends Request {
    userId? : string;
}

interface Type {
    author: string;
    title: string;
    blog: string;
    imagelink:string;
    tags: string[];
}

export const CreatBlog = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        if (!req.userId) {
            res.json({ msg: "User not Authorised" });
            return;
        }
        const { title, blog,imagelink, tags }: Type = req.body;
        const newBlog = await Blog.create({ author: req.userId, title, blog,imagelink, tags });
        if (newBlog) {
            res.status(201).json({ msg: "Blog created Successfully", newBlog });
            return;
        }
    } catch (e) {
        console.error("Error ",e)
        res.status(500).json({ msg: "Error creating blog", error: e });
    }
};
