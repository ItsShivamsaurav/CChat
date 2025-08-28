import { useEffect } from "react";
import "./scrollbar.css";
import axios from "axios";
import { useUser } from "./context";
import { useNavigate } from "react-router-dom";

const RecentChats = () => {
  const navigate = useNavigate();
  const { recentChats, setRecentChats } = useUser();

  const { profile } = useUser();

  const axiosGetData = async () => {
    // console.log("Fetching recent chats for user:", profile.userName);
    try {
      const response = await axios.get(
        `http://localhost:3000/chatroom/${profile.userName}/recentchats`,
        {},
        { withCredentials: true }
      );
      // console.log(response.data);
      setRecentChats(response.data);
      // console.log("recentchat", response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    // console.log("useEffect called for recent chats");
    // console.log("profile in recentchat :", profile);
    if (profile?.userName) {
      axiosGetData();
    } else {
      // console.log("No profile found, skipping recent chats fetch");
    }
  }, [profile]);

  const handleChatClick = (chat) => {
    navigate(
      `/${profile.userName}/${chat.name}/${chat.chatRoomId}/chatinterface`
    );
    // console.log(`Clicked on chat with ${chat.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-23">
      <div className="w-full max-w-lg h-[80vh] bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-6 text-white flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-white/90">
          🗨️ Recent Conversations
        </h2>

        {/* Scrollable chat list with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {recentChats.map((chat, index) => (
            <div
              key={index}
              onClick={() => handleChatClick(chat)}
              className="flex items-center space-x-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full border-2 border-white/60"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-200">
                  {chat.name}
                </h3>
                <p className="text-sm text-white/80">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-white/60 whitespace-nowrap">
                {chat.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentChats;
