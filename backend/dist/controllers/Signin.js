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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = void 0;
const Schema_1 = require("../Schema");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userExists = yield Schema_1.User.findOne({ username, password });
        if (userExists) {
            const token = jsonwebtoken_1.default.sign({ id: userExists._id, username: userExists.username }, config_1.Secret);
            res.cookie("authtoken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            });
            res.status(200).json({ msg: "Signin Successful", token });
            return;
        }
        res.status(400).json({ msg: "User Doesn't Exist" });
    }
    catch (e) {
        console.log("Error:", e);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.Signin = Signin;
