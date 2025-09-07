
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import http from "http";
import { Server } from "socket.io";
import notificationRouter from "./routes/notification.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applyRoutes from './routes/apply.routes.js'



dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:5173", "https://global-connect-platform.vercel.app"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);

// Map to store userId -> socketId
export const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Register user with their ID
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User registered: ${userId} -> ${socket.id}`);
  });

  // Handle private messages
  socket.on("send_message", ({ senderId, receiverId, text }) => {
    const receiverSocketId = userSocketMap.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", {
        senderId,
        text,
        time: new Date().toLocaleTimeString(),
      });
    }
  });

  // On disconnect
  socket.on("disconnect", () => {
    for (let [userId, sId] of userSocketMap.entries()) {
      if (sId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  });
});

app.get("/", (req, res) => {
  res.send("✅ Global Connect API is running successfully!");
});
app.use("/api/jobs", jobRoutes);
app.use("/api", applyRoutes);

// Start server
server.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});
