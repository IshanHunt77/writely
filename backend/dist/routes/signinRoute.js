"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Signin_1 = require("../controllers/Signin");
const router = (0, express_1.Router)();
router.post("/", Signin_1.Signin);
exports.default = router;
