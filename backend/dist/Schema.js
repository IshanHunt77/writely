"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = exports.Blog = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    profilePhoto: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
const BlogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    blog: { type: String, required: true, maxlength: 4000 },
    imagelink: { type: String },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
    tags: { type: [String], required: true }
});
const Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.Blog = Blog;
const Commentschema = new mongoose_1.default.Schema({
    blogId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Blog" },
    author: { type: String },
    comment: { type: String, maxlength: 1000 },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 }
});
const Comments = mongoose_1.default.model("Comments", Commentschema);
exports.Comments = Comments;
