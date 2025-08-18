const { v4: uuidv4 } = require('uuid');
const userRooms = {};
const userSockets = {}; // NEW: maps userId to socket.id

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('registerUser', (userId) => {
      userSockets[userId] = socket.id;
      console.log(`Registered user ${userId} with socket ${socket.id}`);
    });

    socket.on('createRoom', (userId) => {
      const roomId = uuidv4();
      userRooms[userId] = roomId;
      socket.join(roomId);
      socket.emit('roomCreated', roomId);
    });

    socket.on('joinRoom', (userId) => {
      const roomId = userRooms[userId];
      if (roomId) {
        socket.join(roomId);
        socket.emit('joinedRoom', roomId);
      } else {
        socket.emit('error', 'No room found for this user');
      }
    });

    socket.on('sendMessage', ({ roomId, message, senderId }) => {
  const msg = {
    senderId,
    content: message,
    timestamp: new Date()
  };
  io.to(roomId).emit('receiveMessage', msg);
});


    socket.on('disconnect', () => {
  for (const userId in userSockets) {
    if (userSockets[userId] === socket.id) {
      delete userSockets[userId];
      break;
    }
  }
  console.log('User disconnected:', socket.id);
});

  });

  // Expose userSockets for use in routes
  module.exports.userSockets = userSockets;
};
