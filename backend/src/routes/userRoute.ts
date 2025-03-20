import express, { Request, Response } from "express";
import { authentication } from "../middlewares/Authentication";
import { UserDetails, UserInfo } from "../controllers/UserInfo";
import { uploadProfile } from "../uploadprofile";
import { Profile } from "../controllers/Profile";
import { getProfilePhoto } from "../controllers/ProfilePhoto";

const router = express.Router();

router.get('/user',authentication,UserInfo)
router.get('/:author',UserDetails)
router.post('/updateprofile',authentication,Profile)

router.post("/upload", uploadProfile.single("images"), (req: Request, res: Response):void => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
    

  const imageLink = `/uploadProfile/${req.file.filename}`;
  res.json({ imageLink });
});

router.get("/profilephoto", authentication,getProfilePhoto);


export default router