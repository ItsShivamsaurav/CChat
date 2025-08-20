const express = require('express');
const router = express.Router();
const ChatRoom = require("../models/chatRoom");
const User = require("../models/user");

  router.get('/:id1/recentchats', async (req, res) => {

   

    try {
      const userId = req.params.id1;
      const chatrooms = await ChatRoom.find({ participants: userId })
        .sort({ updatedAt: -1 }) 
        .select('-messages');
      if (!chatrooms || chatrooms.length === 0) {
        return res.status(404).json({ message: 'No recent chats found for this user.' });
      }
      // console.log(chatrooms);
      const recentChats = await Promise.all(chatrooms.map(async (room) => {
      const otherUser = room.participants.find(p => p.toString() !== userId);
      // console.log(otherUser);


       return {
        name: otherUser ,
        avatar: otherUser?.avatar || 'https://i.pravatar.cc/150?u=default',
        lastMessage:'No messages yet',
        chatRoomId: room._id,
        updatedAt: room.updatedAt
      };
    }));
      



       return res.status(200).json(recentChats);
    } catch (error) {
      console.error('Error fetching recent chats:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


 
  // create a new chatroom between two users
 router.post('/:id1/:id2', async (req, res) => {
  const { id1, id2 } = req.params;

  // try {
    // Validate ObjectIds
    // if (!mongoose.Types.ObjectId.isValid(id1) || !mongoose.Types.ObjectId.isValid(id2)) {
    //   return res.status(400).json({ error: 'Invalid user IDs' });
    // }

    // Prevent self-chat
    // if (id1 === id2) {
    //   return res.status(400).json({ error: 'Cannot create chatroom with self' });
    // }

    // Check if chatroom already exists
    // let existingRoom = await ChatRoom.findOne({
    //   isGroupChat: false,
    //   participants: { $all: [id1, id2], $size: 2 }
    // });

    // if (existingRoom) {
    //   return res.status(200).json({ message: 'Chatroom already exists', chatRoom: existingRoom });
    // }

  try {
    if (id1 === id2) {
      return res.status(400).json({ error: 'Cannot create chatroom with self' });
    }

    const existingRoom = await ChatRoom.findOne({
      isGroupChat: false,
      participants: { $all: [id1, id2], $size: 2 }
    });

    if (existingRoom) {
      return res.status(200).json({ message: 'Chatroom already exists', chatRoom: existingRoom });
    }

    const newChatRoom = new ChatRoom({
      participants: [id1, id2],
      isGroupChat: false
    });

    await newChatRoom.save();

    const recentChatEntry = {
      chatRoomId: newChatRoom._id,
      updatedAt: new Date()
    };

    await Promise.all([
      User.findByIdAndUpdate(id1, { $push: { recentChats: recentChatEntry } }),
      User.findByIdAndUpdate(id2, { $push: { recentChats: recentChatEntry } })
    ]);

    res.status(201).json({ message: 'New chatroom created', chatRoom: newChatRoom });
  } catch (error) {
    console.error('Error creating chatroom:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
