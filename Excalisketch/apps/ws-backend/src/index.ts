import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || typeof decoded === "string" || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e) {
    console.error("❌ Invalid token:", e);
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  console.log(`✅ User connected: ${userId}`);

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }

    console.log("📩 message received");
    console.log(parsedData);

    // 🏠 Join room
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      if (user && !user.rooms.includes(parsedData.roomId)) {
        user.rooms.push(parsedData.roomId);
        console.log(`👋 ${userId} joined room ${parsedData.roomId}`);
        ws.send(
          JSON.stringify({
            type: "joined_room",
            roomId: parsedData.roomId,
          })
        );
      }
      return;
    }

    // 🚪 Leave room
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) return;
      user.rooms = user.rooms.filter((x) => x !== parsedData.roomId);
      console.log(`👋 ${userId} left room ${parsedData.roomId}`);
      ws.send(
        JSON.stringify({
          type: "left_room",
          roomId: parsedData.roomId,
        })
      );
      return;
    }

    // 💬 Handle chat messages
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      if (!roomId || !message) {
        console.warn("⚠️ Invalid chat payload");
        return;
      }

      console.log(`💬 Chat from ${userId} in room ${roomId}: ${message}`);

      try {
        const savedChat = await prismaClient.chat.create({
          data: {
            roomId: Number(roomId),
            message,
            userId,
          },
        });
        console.log("💾 Saved chat:", savedChat);
      } catch (err) {
        console.error("❌ Prisma error:", err);
      }

      // Broadcast to all users in that room
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              roomId,
              message,
              senderId: userId,
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log(`❎ Disconnected: ${userId}`);
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) users.splice(index, 1);
  });
});

console.log("🚀 WebSocket server running at ws://localhost:8080");
