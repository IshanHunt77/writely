import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Secret } from "../config";

interface AuthRequest extends Request {
    userId?: string;
    username?: string;
}

export const authentication = (req: AuthRequest, res: Response, next: NextFunction): void => {

    const token = req.cookies.authtoken;

    if (!token) {
        res.status(401).json({ msg: "Token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, Secret) as { id: string, username: string };
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(403).json({ msg: "Invalid Token" });
    }
};
