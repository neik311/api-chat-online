import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import logging from "./config/logging";
import route from "./routes/index";

const NAME_SPACE: string = "Server";
const app: Application = express();
const port = process.env.PORT || 8088;

app.use(cors({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.use((_req, res, _next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

export let users: any[] = [];
const addUser = (id: string, avatar: string, socketId: any) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    users.push({ id, avatar, socketId });
    return true;
  }
  users[index].socketId = socketId;
  return true;
};
const removeUser = (socketId: any) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};
io.on("connection", (socket) => {
  // console.log("a user connected");
  socket.on("addUser", ({ id, avatar }) => {
    console.log("add user " + id + " - ", socket.id);
    if (addUser(id, avatar, socket.id)) {
      io.emit("getUsers", users);
    }
  });
  socket.on("sendMessage", ({ senderId, receiverId, text, type }) => {
    console.log({ senderId, text });
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
      type,
    });
  });
  socket.on("deleteMessage", ({ receiverId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getDeleteMessage", {});
  });
  socket.on("sendConversations", ({ senderId, receiveId }) => {
    const sender = getUser(senderId);
    io.to(sender?.socketId).emit("getConversations", users);
    const receive = getUser(receiveId);
    io.to(receive?.socketId).emit("getConversations", users);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnect ", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

httpServer.listen(port, () => {
  logging.info(NAME_SPACE, `Server is running http://localhost:${port}`);
});
