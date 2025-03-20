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
exports.CreatBlog = void 0;
const Schema_1 = require("../Schema");
const CreatBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.json({ msg: "User not Authorised" });
            return;
        }
        const { title, blog, imagelink, tags } = req.body;
        const newBlog = yield Schema_1.Blog.create({ author: req.userId, title, blog, imagelink, tags });
        if (newBlog) {
            res.status(201).json({ msg: "Blog created Successfully", newBlog });
            return;
        }
    }
    catch (e) {
        console.error("Error ", e);
        res.status(500).json({ msg: "Error creating blog", error: e });
    }
});
exports.CreatBlog = CreatBlog;
