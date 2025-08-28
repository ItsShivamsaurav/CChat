const express = require("express");
const router = express.Router();
const Message = require("../models/message");


router.post("/:senderId/message", async (req, res) => {
  // console.log("Message route hit");

  const { senderId, receiverId, chatRoomId, message } = req.body;
  // console.log(senderId + " : " + message);
  try {
    const newmessage = await Message.create({
      senderId,
      receiverId,
      chatRoomId,
      message,
    });



    return res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    // console.error("Error creating message:", error);
    return res.send("something wrong happened.", error);
  }
});

router.get("/:chatroomId", async (req, res) => {
  const { chatroomId } = req.params;
  // console.log("Fetching messages for chatroom:", chatroomId);

  try {
    const messages = await Message.find({ chatRoomId: chatroomId });
    // console.log("Messages found:", messages);
    res.status(200).json(messages); 
  } catch (error) {
    // console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
