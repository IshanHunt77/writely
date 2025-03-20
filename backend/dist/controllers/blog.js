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
exports.blog = void 0;
const Schema_1 = require("../Schema");
const blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.blogId;
        if (!blogId) {
            res.status(400).json({ msg: "BlogId required" });
            return;
        }
        const blog = yield Schema_1.Blog.findOne({ _id: blogId });
        if (!blog) {
            res.status(404).json({ msg: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    }
    catch (e) {
        console.log("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.blog = blog;
