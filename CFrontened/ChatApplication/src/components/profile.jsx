import React from "react";
import { useUser } from "./context";
import { useEffect,useState } from "react";

import { CircularProgress } from "@mui/material";

const ProfileView = () => {
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setLoading(false);
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#2c3e50]">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const user = {
    name: profile.name,
    username: profile.userName,
    bio: profile.status,
    location: "Mumbai, India",
    joined: "March 2022",
    avatar: "https://i.pravatar.cc/150",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#2c3e50] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-purple-400 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-purple-200">{user.name}</h2>
          <p className="text-sm text-white/80">{user.username}</p>
        </div>

        {/* Bio */}
        <div className="mt-6 text-center">
          <p className="text-white/90 italic">{user.bio}</p>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-2 text-sm text-white/70">
          <div className="flex justify-between">
            <span>📍 Location:</span>
            <span>{user.location}</span>
          </div>
          <div className="flex justify-between">
            <span>🗓️ Joined:</span>
            <span>{user.joined}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300">
            Message
          </button>
          <button className="px-4 py-2 border border-purple-400 hover:bg-purple-600 rounded-lg font-semibold transition-all duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
