const express = require('express');
const router = express.Router();
const Message = require("../models/message");

router.post('/:senderId/message',async (req, res) => {
  console.log("Message route hit");

  const {senderId,receiverId,chatRoomId,message} = req.body;
  try {
    const newmessage = await Message.create({
      senderId,
      receiverId,
      chatRoomId,
      message,

    });
   return res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error creating message:', error);
    return res.send("something wrong happened.",error);
  }
});

router.get('/:id1/:id2/:chatroomId', (req, res) => {
  // res.send(`Messages for chatroom ${req.params.chatroomId}`);
  // get all the message from the server where sender is id1 and receiver is id2;
});


module.exports = router;