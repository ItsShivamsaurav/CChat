import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "./context";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

const ChatInterface = () => {
  const { userid1, userid2, chatroomId } = useParams();
  const { messages, setMessages } = useUser();
  const [messageinput, setMessageInput] = useState("");

  const axiosPostData = async () => {
    try {
      console.log("Axios Post:");
      const response = await axios.post(
        `http://localhost:3000/message/${userid1}/message`,
        {
          senderId: userid1,
          receiverId: userid2,
          chatRoomId: chatroomId,
          message: messageinput,
        }
      );

      console.log("Message sent:", response);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("joinRoom", chatroomId);
    console.log(`${userid1} Joined room: ${chatroomId}`);

    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      console.log("Listening for receiveMessage...");
      setMessages((prev) => [...prev, data]);
      console.log(data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", chatroomId);
      socket.disconnect();
      console.log(`Left room: ${chatroomId}`);
    };
  }, [chatroomId]);

  // const sendMessage = () => {
  //   socket.emit('sendMessage', {roomId:1 ,message: input });
  // };

  // const [messages, setMessages] = useState([
  //   { id: 1, sender: 'Elena', text: 'Hey, have you tried the new CChat voice rooms?' },
  //   { id: 2, sender: 'You', text: 'Not yet! Are they as good as they sound?' },
  //   { id: 3, sender: 'Elena', text: 'Better. It’s like talking in velvet.' },
  // ]);

  const sendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      roomId: chatroomId,
      senderId: userid1,
      receiverId: userid2,
      message: messageinput,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    axiosPostData();
    // Update local UI
    setMessages((prev) => [...prev, { ...messageData, sender: "You" }]);
    setMessageInput("");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#2c3e50] flex flex-col items-center justify-center text-white px-4 py-23">
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-300">CChat</h2>
          <span className="text-sm text-white/60">Elena Kapoor</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="px-6 py-4 border-t border-white/10 flex items-center space-x-4"
        >
          <input
            type="text"
            value={messageinput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
