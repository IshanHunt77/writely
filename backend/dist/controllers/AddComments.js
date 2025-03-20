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
exports.AddComments = void 0;
const Schema_1 = require("../Schema");
const AddComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.body;
        const { comment } = req.body;
        const username = req.username;
        if (!blogId || !comment) {
            return res.status(400).json({ msg: "blogId and comment are required" });
        }
        if (!username) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        const newComment = yield Schema_1.Comments.create({ blogId, author: username, comment });
        console.log("Comment added successfully");
        res.status(201).json({ msg: "Comment added successfully", newComment });
    }
    catch (e) {
        console.error("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.AddComments = AddComments;
