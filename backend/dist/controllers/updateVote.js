"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVoteComment = exports.updateVoteBlog = void 0;
const Schema_1 = require("../Schema");
const updateVoteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.blogId;
        const { upvote, downvote } = req.body;
        if (!blogId) {
            res.status(400).json({ msg: "BlogId required" });
            return;
        }
        if (upvote) {
            yield Schema_1.Blog.findByIdAndUpdate(blogId, { $inc: { upvote: 1 } });
        }
        else if (downvote) {
            yield Schema_1.Blog.findByIdAndUpdate(blogId, { $inc: { downvote: -1 } });
        }
        res.status(200).json({ msg: "Vote updated successfully" });
    }
    catch (e) {
        console.error("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.updateVoteBlog = updateVoteBlog;
const updateVoteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { upvote, downvote, commentId } = req.body;
        if (!commentId) {
            res.status(400).json({ msg: "CommentId required" });
            return;
        }
        if (upvote) {
            yield Schema_1.Comments.findByIdAndUpdate(commentId, { $inc: { upvote: 1 } });
        }
        else if (downvote) {
            yield Schema_1.Comments.findByIdAndUpdate(commentId, { $inc: { downvote: -1 } });
        }
        res.status(200).json({ msg: "Vote updated successfully" });
    }
    catch (e) {
        console.error("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.updateVoteComment = updateVoteComment;
