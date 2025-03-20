import { Request, Response } from "express";
import { User } from "../Schema";

interface CustomRequest extends Request {
  userId?: string;
}

export const UserInfo = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }
    const userinfo = await User.findById(userId);
    if (!userinfo) {
      res.status(404).json({ msg: "No user found" });
      return;
    }
    res.json({ userinfo });
  } catch (error) {
    res.status(500).json({ "Error finding User:": error });
  }
};

export const UserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.author
      const userinfo = await User.findById(userId);
      if (!userinfo) {
        res.status(404).json({ msg: "No user found" });
        return;
      }
      res.json({ userinfo });
    } catch (error) {
      res.status(500).json({ "Error finding User:": error });
    }
  };
