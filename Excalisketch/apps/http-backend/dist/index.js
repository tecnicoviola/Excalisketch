"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/backend-common/config");
const middleware_1 = require("./middleware");
const types_1 = require("@repo/common/types");
const client_1 = require("@repo/db/client");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/signup", async (req, res) => {
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    try {
        const user = await client_1.prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        });
        res.json({
            userId: user.id
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists with this username"
        });
    }
});
app.post("/signin", async (req, res) => {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    // TODO: Compare the hashed pws here
    const user = await client_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user?.id
    }, config_1.JWT_SECRET);
    res.json({
        token
    });
});
app.post("/room", middleware_1.middleware, async (req, res) => {
    const parsedData = types_1.CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        });
        return;
    }
    // @ts-ignore: TODO: Fix this
    const userId = req.userId;
    try {
        const room = await client_1.prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        res.json({
            roomId: room.id
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        });
    }
});
app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await client_1.prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });
        res.json({
            messages
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            messages: []
        });
    }
});
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await client_1.prismaClient.room.findFirst({
        where: {
            slug
        }
    });
    res.json({
        room
    });
});
app.listen(3001);
