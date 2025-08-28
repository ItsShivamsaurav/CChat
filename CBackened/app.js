const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const chatRoomRoute = require("./routes/chatRoomRoute");
const messageRoute = require("./routes/messageRoute");
const newUserRoute = require("./routes/newUserRoute");

const app = express();
const port = 3000;

// we hav to define separate cors for socket.io and express app
// because socket.io uses its own server and express app uses its own server.

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const userRooms = {};
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSockets = {};
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("registerUser", (userId) => {
    userSockets[userId] = socket.id;
    // console.log(`Registered user ${userId} with socket ${socket.id}`);
  });

  socket.on("createRoom", (userId) => {
    const roomId = uuidv4();
    userRooms[userId] = roomId;
    socket.join(roomId);
    socket.emit("roomCreated", roomId);
  });

  socket.on("joinRoom", (chatroomId) => {
    // console.log("Hello from JoinRoom. roomId:", chatroomId);
    // const roomId = userRooms[userId];
    // if (roomId) {
    socket.join(chatroomId);
    socket.emit("joinedRoom", chatroomId);
    // } else {
    // socket.emit('error', 'No room found for this user');
    // }
  });

  socket.on("sendMessage", ({ roomId, message, receiverId, senderId }) => {
    // console.log("Message received from client:", message);
    const msg = {
      roomId,
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    };
    socket.to(roomId).emit("receiveMessage", msg);
    // console.log("Message emitted to room:", roomId);
  });

  socket.on("leaveRoom", () => {
    for (const userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User ${userId} left and removed from userSockets`);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDb."))
  .catch((err) => console.log("Error ", err));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(checkForAuthenticationCookie("token"));

app.use("/newuser", newUserRoute);
app.use("/user", checkForAuthenticationCookie("token"), userRoute);
app.use("/message", checkForAuthenticationCookie("token"), messageRoute);
app.use("/chatroom", checkForAuthenticationCookie("token"), chatRoomRoute);

app.get("/", (req, res) => {
  res.send("Hello From Chat World!");
});

// require('./socket/chatsocket')(io);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
