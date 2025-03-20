import { Request, Response } from "express";
import { User } from "../Schema";
import { Secret } from "../config";
import jwt from "jsonwebtoken";

interface userType {
    username: string;
    password: string;
}

export const Signin = async (req: Request, res: Response):Promise<void> => {
    try {
        const { username, password }: userType = req.body;
        const userExists = await User.findOne({ username, password });
        if (userExists) {
            const token = jwt.sign({ id: userExists._id,username:userExists.username }, Secret);
            res.cookie("authtoken",token,{
                httpOnly:true,
                secure:true,
                sameSite:"strict"
            })
             res.status(200).json({ msg: "Signin Successful" ,token});
             return;
        }
         res.status(400).json({ msg: "User Doesn't Exist" });
    } catch (e) {
        console.log("Error:", e);
         res.status(500).json({ msg: "Internal Server Error" });
    }
};
