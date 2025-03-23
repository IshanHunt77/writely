"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const signinRoute_1 = __importDefault(require("./routes/signinRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const AddComments_1 = require("./controllers/AddComments");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/uploads', express_1.default.static('uploads'));
app.use('/uploadProfile', express_1.default.static('uploadProfile'));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/signup", signupRoute_1.default);
app.use("/signin", signinRoute_1.default);
app.use("/blog", blogRoute_1.default);
app.use("/profile", userRoute_1.default);
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.on("new-comment", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { blogId, comment, username } = data;
        try {
            if (!username) {
                socket.emit("comment-status", { code: 401, msg: "Invalid Token" });
                return;
            }
            const req = { body: { comment, blogId }, username };
            const res = {
                status: (code) => ({
                    json: (msg) => {
                        socket.emit("comment-status", { code, msg });
                        return res;
                    },
                }),
            };
            yield (0, AddComments_1.AddComments)(req, res);
            io.emit("comment-added", { blogId, comment, username });
        }
        catch (error) {
            console.log("JWT Error:", error);
            socket.emit("comment-status", { code: 401, msg: "Invalid Token" });
        }
    }));
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
const mongodbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/BloggersDb");
        console.log("Connected to MongoDB");
    }
    catch (e) {
        console.log("Error:", e);
    }
});
mongodbConnect();
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
