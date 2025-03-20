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
exports.Profile = void 0;
const Schema_1 = require("../Schema");
const Profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, profilePhoto } = req.body;
        const userId = req.userId;
        const userinfo = yield Schema_1.User.updateOne({ _id: userId }, { $set: { username, profilePhoto } });
        res.json({ msg: "Profile Updated", userinfo });
    }
    catch (error) {
        res.json({ msg: "Error updating profile", error });
    }
});
exports.Profile = Profile;
