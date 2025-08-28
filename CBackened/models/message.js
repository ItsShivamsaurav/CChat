const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: String,
      ref: "User",
      required: true,
    },
    chatRoomId: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,   
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("message", messageSchema);
