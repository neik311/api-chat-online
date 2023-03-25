"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const logging_1 = __importDefault(require("./config/logging"));
const index_1 = __importDefault(require("./routes/index"));
const NAME_SPACE = "Server";
const app = (0, express_1.default)();
const port = process.env.PORT || 8088;
app.use((0, cors_1.default)({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, index_1.default)(app);
app.use((_req, res, _next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
exports.users = [];
const addUser = (id, avatar, socketId) => {
    const index = exports.users.findIndex((u) => u.id === id);
    if (index === -1) {
        exports.users.push({ id, avatar, socketId });
        return true;
    }
    exports.users[index].socketId = socketId;
    return true;
};
const removeUser = (socketId) => {
    exports.users = exports.users.filter((user) => user.socketId !== socketId);
};
const getUser = (id) => {
    return exports.users.find((user) => user.id === id);
};
io.on("connection", (socket) => {
    socket.on("addUser", ({ id, avatar }) => {
        console.log("add user " + id + " - ", socket.id);
        if (addUser(id, avatar, socket.id)) {
            io.emit("getUsers", exports.users);
        }
    });
    socket.on("sendMessage", ({ senderId, receiverId, text, type }) => {
        console.log({ senderId, text });
        const user = getUser(receiverId);
        io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("getMessage", {
            senderId,
            text,
            type,
        });
    });
    socket.on("deleteMessage", ({ receiverId }) => {
        const user = getUser(receiverId);
        io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("getDeleteMessage", {});
    });
    socket.on("sendConversations", ({ senderId, receiveId }) => {
        const sender = getUser(senderId);
        io.to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit("getConversations", exports.users);
        const receive = getUser(receiveId);
        io.to(receive === null || receive === void 0 ? void 0 : receive.socketId).emit("getConversations", exports.users);
    });
    socket.on("disconnect", () => {
        console.log("a user disconnect ", socket.id);
        removeUser(socket.id);
        io.emit("getUsers", exports.users);
    });
});
httpServer.listen(port, () => {
    logging_1.default.info(NAME_SPACE, `Server is running http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map