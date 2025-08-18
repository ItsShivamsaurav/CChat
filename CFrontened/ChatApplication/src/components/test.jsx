import {React, useState,useEffect} from 'react';
import './scrollbar.css';
import Navbar from './navbar';
import axios from "axios";
import { useUser } from './context';

const RecentChats = () => {
  const {conversations, setConversations} = useState([]);
  const { profile } = useUser();

  const axiosGetData = async () => {
    try {
      console.log("recentchat");
      const response = await axios.get(`http://localhost:3000/chatroom/${profile._id}/recentchats`);
      console.log(response.data);
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  axiosGetData ();
}, []);

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-23">
      <div className="w-full max-w-lg h-[80vh] bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-6 text-white flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center text-white/90">🗨️ Recent Conversations</h2>

        {/* Scrollable chat list with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {conversations.map((chat, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white/10 rounded-lg p-4 hover:bg-white/20 transition"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full border-2 border-white/60"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-200">{chat.name}</h3>
                <p className="text-sm text-white/80">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-white/60 whitespace-nowrap">{chat.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default RecentChats;
