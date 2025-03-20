import { Request, Response } from "express";
import { User } from "../Schema";

interface CustomRequest extends Request {
  userId?: string;
}

export const Profile = async (req: CustomRequest, res: Response) => {
  try {
    const { username, profilePhoto } = req.body;
    const userId = req.userId;
    const userinfo = await User.updateOne(
      { _id: userId },
      { $set: { username, profilePhoto } }
    );
    res.json({ msg: "Profile Updated", userinfo });
  } catch (error) {
    res.json({ msg: "Error updating profile", error });
  }
};
