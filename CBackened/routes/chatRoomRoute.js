const express = require("express");
const router = express.Router();
const ChatRoom = require("../models/chatRoom");
const User = require("../models/user");

router.get("/:id1/recentchats", async (req, res) => {
  // console.log("Fetching recent chats for user:", req.params.id1);

  try {
    const userId = req.params.id1;
    const chatrooms = await ChatRoom.find({ participantsUserName: userId })
      .sort({ updatedAt: -1 })
      .select("-messages");
    if (!chatrooms || chatrooms.length === 0) {
      return res
        .status(404)
        .json({ message: "No recent chats found for this user." });
    }
    // console.log(chatrooms);
    const recentChats = await Promise.all(
      chatrooms.map(async (room) => {
        const otherUser = room.participantsUserName.find(
          (p) => p.toString() !== userId
        );
        // console.log(otherUser);

        return {
          name: otherUser,
          avatar: otherUser?.avatar || "https://i.pravatar.cc/150?u=default",
          lastMessage: "No messages yet",
          chatRoomId: room._id,
          updatedAt: room.updatedAt,
        };
      })
    );

    // console.log("Recent chats fetched successfully:");
    return res.status(200).json(recentChats);
  } catch (error) {
    // console.error("Error fetching recent chats:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// create a new chatroom between two users
router.post("/:userName1/:userName2", async (req, res) => {
  console.log(
    "Creating chatroom between users:",
    req.params.userName1,
    req.params.userName2
  );

  const { userName1, userName2 } = req.params;
  const userId1 = await User.findOne({ userName: userName1 });
  const userId2 = await User.findOne({ userName: userName2 });

  if (!userId2) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    if (userId1._id === userId2._id) {
      return res
        .status(400)
        .json({ error: "Cannot create chatroom with self" });
    }

    const existingRoom = await ChatRoom.findOne({
      isGroupChat: false,
      participantsId: { $all: [userId1._id, userId2._id], $size: 2 },
    });

    if (existingRoom) {
      // console.log("Chatroom already exists:");
      return res
        .status(200)
        .json({ message: "Chatroom already exists", chatRoom: existingRoom });
    }

    const newChatRoom = new ChatRoom({
      participantsId: [userId1._id, userId2._id],
      participantsUserName: [userName1, userName2],
      isGroupChat: false,
    });

    await newChatRoom.save();

    // console.log("New chatroom created:", newChatRoom);
    res
      .status(201)
      .json({ message: "New chatroom created", chatRoom: newChatRoom });
  } catch (error) {
    // console.error("Error creating chatroom:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
