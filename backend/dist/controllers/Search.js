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
exports.searchBlogs = void 0;
const Schema_1 = require("../Schema");
const searchBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        if (!search) {
            res.status(400).json({ error: "Search term is required" });
            return;
        }
        // Assuming tags is an array of strings in your schema.
        const blogs = yield Schema_1.Blog.find({ tags: { $in: [search] } });
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.searchBlogs = searchBlogs;
