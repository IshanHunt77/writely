import { Router } from "express";
import { Signin } from "../controllers/Signin";

const router = Router();
router.post("/", Signin);
export default router;
