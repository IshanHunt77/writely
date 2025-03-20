import  {Signup}  from "../controllers/Signup";
import express from "express"

const router = express.Router();

router.route("/",).post(Signup)

export default router;
