import express, { Request, Response } from "express";
import { Blogs } from "../controllers/Blogs";
import { authentication } from "../middlewares/Authentication";
import { CreatBlog } from "../controllers/CreateBlog";
import { blog } from "../controllers/blog";
import { AddComments } from "../controllers/AddComments";
import { blogComments } from "../controllers/blogComments";
import { updateVoteBlog } from "../controllers/updateVote";
import { upload } from "../upload";
import { UserBlogs } from "../controllers/UserBlogs";
import { searchBlogs } from "../controllers/Search";
import { getProfilePhoto } from "../controllers/ProfilePhoto";

const router = express.Router();

router.get("/", authentication, Blogs);
router.get("/search", searchBlogs);
router.post("/createBlogs", authentication, CreatBlog);
router.get("/userblogs", authentication, UserBlogs);
router.get("/comments/:blogId", authentication, blogComments);
router.get("/:blogId", authentication, blog);
router.post("/b/:blogId", authentication, updateVoteBlog);

router.post("/upload", upload.single("image"), (req: Request, res: Response):void => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
    

  const imageLink = `/uploads/${req.file.filename}`;
  res.json({ imageLink });
});




router.get("/search", authentication,searchBlogs);



export default router;
