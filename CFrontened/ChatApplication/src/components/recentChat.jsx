import React from 'react';
import './scrollbar.css'; // Import custom scrollbar styles
import Navbar from './navbar';
import axios from "axios";

const RecentChats = () => {

  const axiosGetData = async () => {
    const payload = {
      userId:profile._id,
    }
    try {
      const response = await axios.get("http://localhost:3000/login", payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const conversations = [
    {
      name: 'Aarav Mehta',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Let’s catch up tomorrow evening!',
      timestamp: 'Today at 3:45 PM',
    },
    {
      name: 'Zoya Khan',
      avatar: 'https://i.pravatar.cc/150?img=33',
      lastMessage: 'Got the files. Will review tonight.',
      timestamp: 'Yesterday at 9:12 PM',
    },
    {
      name: 'Ravi Sharma',
      avatar: 'https://i.pravatar.cc/150?img=25',
      lastMessage: 'Thanks for the help earlier!',
      timestamp: 'Monday at 11:03 AM',
    },
    {
      name: 'Neha Verma',
      avatar: 'https://i.pravatar.cc/150?img=45',
      lastMessage: 'Can you send the invoice again?',
      timestamp: 'Sunday at 6:30 PM',
    },
    {
      name: 'Kabir Singh',
      avatar: 'https://i.pravatar.cc/150?img=18',
      lastMessage: 'Let’s meet at the café.',
      timestamp: 'Saturday at 2:15 PM',
    },
    {
      name: 'Simran Kaur',
      avatar: 'https://i.pravatar.cc/150?img=29',
      lastMessage: 'Loved your latest post!',
      timestamp: 'Friday at 10:00 AM',
    },
  ];

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
