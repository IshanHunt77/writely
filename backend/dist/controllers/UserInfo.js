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
exports.UserDetails = exports.UserInfo = void 0;
const Schema_1 = require("../Schema");
const UserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        const userinfo = yield Schema_1.User.findById(userId);
        if (!userinfo) {
            res.status(404).json({ msg: "No user found" });
            return;
        }
        res.json({ userinfo });
    }
    catch (error) {
        res.status(500).json({ "Error finding User:": error });
    }
});
exports.UserInfo = UserInfo;
const UserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.author;
        const userinfo = yield Schema_1.User.findById(userId);
        if (!userinfo) {
            res.status(404).json({ msg: "No user found" });
            return;
        }
        res.json({ userinfo });
    }
    catch (error) {
        res.status(500).json({ "Error finding User:": error });
    }
});
exports.UserDetails = UserDetails;
