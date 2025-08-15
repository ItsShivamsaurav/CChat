const express = require('express');
const router = express.Router();

router.post('/',async (req, res) => {
  const {senderId,receiverId,chatRoomId,message} = req.body;
  try {
    const message = await Message.create({
      senderId,
      receiverId,
      chatRoomId,
      message,

    });
    return res.status(200);
  } catch (error) {
    return res.send("something wrong happened.");
  }
});

router.get('/:id1/:id2/:chatroomId', (req, res) => {
  // res.send(`Messages for chatroom ${req.params.chatroomId}`);
  // get all the message from the server where sender is id1 and receiver is id2;
});


module.exports = router;