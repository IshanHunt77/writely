"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("../middlewares/Authentication");
const UserInfo_1 = require("../controllers/UserInfo");
const uploadprofile_1 = require("../uploadprofile");
const Profile_1 = require("../controllers/Profile");
const ProfilePhoto_1 = require("../controllers/ProfilePhoto");
const router = express_1.default.Router();
router.get('/user', Authentication_1.authentication, UserInfo_1.UserInfo);
router.get('/:author', UserInfo_1.UserDetails);
router.post('/updateprofile', Authentication_1.authentication, Profile_1.Profile);
router.post("/upload", uploadprofile_1.uploadProfile.single("images"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }
    const imageLink = `/uploadProfile/${req.file.filename}`;
    res.json({ imageLink });
});
router.get("/profilephoto", Authentication_1.authentication, ProfilePhoto_1.getProfilePhoto);
exports.default = router;
