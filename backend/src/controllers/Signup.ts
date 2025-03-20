import { Request, Response } from "express";
import { User } from "../Schema";

interface userType {
    username: string;
    email: string;
    password: string;
}

export const Signup = async (req: Request, res: Response):Promise<void> => {
    try {
        const { username, email, password }: userType = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) {
             res.status(400).json({ msg: "User Already exists" });
             return;
        }
        const user = await User.create({ username, email, password });
         res.status(201).json({ msg: "User Created Successfully", user });
    } catch (e) {
         res.status(500).json({ msg: "Internal Server error" });
    }
};
