const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "https://i.pravatar.cc/150?img=5",
    },
    bio: {
      type: String,
      default: "Hey there! I am using CChat.",
      trim: true,
    },
    status: {
      type: String,
      default: "Hey there! I am using CChat.",
      trim: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    recentChats: [
      {
        groupName: {
          type: Schema.Types.ObjectId,
          ref: "chatRoom",
        },
        // withUser: {
        chatRoomId: {
          type: Schema.Types.ObjectId,
          ref: "chatRoom",
        },
        // withUser: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'User'
        // },
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString("hex");
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashPassword = user.password;
    const userProvidedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashPassword !== userProvidedPassword)
      throw new Error("Password not matched.");

    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("user", userSchema);
module.exports = User;
