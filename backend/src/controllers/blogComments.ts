import mongoose from "mongoose";
import { Comments } from "../Schema";
import { Request, Response } from "express";

export const blogComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.blogId as string;
        console.log(blogId)
        if (!blogId) {
            res.status(400).json({ msg: "blogId is required" });
            return;
        }
        

        const blogcomments = await Comments.find({ blogId });
        if (!blogcomments || blogcomments.length === 0) {
            res.status(404).json({ msg: "No comments found for this blog" });
            return;
        }

        res.status(200).json(blogcomments);
        return;
    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
