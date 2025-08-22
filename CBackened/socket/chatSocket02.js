const { v4: uuidv4 } = require("uuid");

const userRooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("createRoom", (userId) => {
      const roomId = uuidv4();
      userRooms[userId] = roomId;
      socket.join(roomId);
      socket.emit("roomCreated", roomId);
    });

    socket.on("joinRoom", (userId) => {
      const roomId = userRooms[userId];
      if (roomId) {
        socket.join(roomId);
        socket.emit("joinedRoom", roomId);
      } else {
        socket.emit("error", "No room found for this user");
      }
    });

    socket.on("sendMessage", ({ roomId, message }) => {
      console.log(message);
      io.to(roomId).emit("receiveMessage", message);
    });
  });
};
