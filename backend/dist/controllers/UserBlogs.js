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
exports.UserBlogs = void 0;
const Schema_1 = require("../Schema");
const UserBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({ msg: "User not Authorized" });
            return;
        }
        const blogs = yield Schema_1.Blog.find({ author: req.userId });
        if (!blogs || blogs.length === 0) {
            res.status(404).json({ msg: "Blogs not Found" });
            return;
        }
        res.status(200).json(blogs);
    }
    catch (e) {
        console.log("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.UserBlogs = UserBlogs;
