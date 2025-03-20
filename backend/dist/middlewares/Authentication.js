"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authentication = (req, res, next) => {
    const token = req.cookies.authtoken;
    if (!token) {
        res.status(401).json({ msg: "Token missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.Secret);
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    }
    catch (err) {
        res.status(403).json({ msg: "Invalid Token" });
    }
};
exports.authentication = authentication;
