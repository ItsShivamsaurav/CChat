const express = require('express');
const router = express.Router();
const ChatRoom = require("../models/chatRoom");
const mongoose = require('mongoose');
const { userSockets } = require('../socket/chatsocket');



module.exports = (io) => {

      // POST to initialize chat
     router.post('/:id1/:id2/:chatroomId', async (req, res) => {
        const { id1, id2, chatroomId } = req.params;
    
        try {
          if (!mongoose.Types.ObjectId.isValid(id1) || !mongoose.Types.ObjectId.isValid(id2)) {
            return res.status(400).json({ error: 'Invalid user IDs' });
          }
    
          let chatRoom = await ChatRoom.findOne({ chatRoomId });
          if (!chatRoom) {
            chatRoom = new ChatRoom({
              chatRoomId,
              participants: [id1, id2],
              isGroupChat: false
            });
            await chatRoom.save();
          }
    
          // Emit to specific users
          [id1, id2].forEach(userId => {
            const socketId = userSockets[userId];
            if (socketId) {
              io.to(socketId).emit('initChat', {
                chatRoomId,
                participants: [id1, id2],
                message: 'Chat initialized'
              });
            }
          });
    
          res.status(200).json({ message: 'Chat initialized', chatRoom });
        } catch (error) {
          console.error('Error initializing chat:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

      return router;
};