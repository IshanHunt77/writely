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
exports.Signup = void 0;
const Schema_1 = require("../Schema");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const userExists = yield Schema_1.User.findOne({ username });
        if (userExists) {
            res.status(400).json({ msg: "User Already exists" });
            return;
        }
        const user = yield Schema_1.User.create({ username, email, password });
        res.status(201).json({ msg: "User Created Successfully", user });
    }
    catch (e) {
        res.status(500).json({ msg: "Internal Server error" });
    }
});
exports.Signup = Signup;
