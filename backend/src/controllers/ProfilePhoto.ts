// profileController.ts
import { Request, Response } from "express";
import { User } from "../Schema";

interface CustomRequest extends Request {
  userId?: string;
}

export const getProfilePhoto = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ profilePhoto: user.profilePhoto });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
