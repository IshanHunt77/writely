import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage:StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./uploadProfile/");
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const uploadProfile = multer({ storage })

export {uploadProfile}
