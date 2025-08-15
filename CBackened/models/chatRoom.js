const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const chatRoomSchema = new Schema(
  {
   chatRoomId: {
      type: String,
      unique: true,
      default: uuidv4,
      trim: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      trim: true,
    },
    groupAvatar: {
      type: String, 
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true }
);

module.exports = model('chatRoom', chatRoomSchema)