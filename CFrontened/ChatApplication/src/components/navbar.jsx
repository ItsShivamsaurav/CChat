import { useUser } from "./context";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


import Button from '@mui/material/Button';

const Navbar = () => {
  const { profile } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
   const { logout } = useUser();

  const axiosPostData = async () => {
    // console.log("Creating chatroom with search query:", searchQuery);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ORIGIN}/chatroom/${profile.userName}/${searchQuery}`,
        {},
        { withCredentials: true }
      );

      // console.log("Chatroom created:", response);
      navigate(
        `/${profile.userName}/${searchQuery}/${response.data.chatRoom._id}/chatInterface`
      );
    } catch (error) {
      // console.error("Error creating chatroom:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a username to search");
      return;
    }
    axiosPostData();
    setSearchQuery("");
    e.target.reset();
  };

  const handleLogout = () => {
    // console.log("Logging out...");
    localStorage.removeItem('token');
    logout();
    // Navigate is handled by protected rouute
    navigate("/");
  };

  return (<>
  
    {profile && <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-fit">
      <div className="bg-gradient-to-r from-[#1f1c2c] via-[#928dab] to-[#2c3e50] rounded-full shadow-xl px-8 py-3 flex items-center space-x-6">
        <ul className="flex space-x-8 text-white font-semibold text-sm">
          <NavItem to={`/${profile?.userName}/recentchats`} label="Recent Chat" />
          
          <NavItem
            to={`/${profile?.userName}/globalchats`}
            label="Global Chat"
          />
          <NavItem to={`/${profile?.userName}/profileview`} label="Profile" />
          
          <Button onClick={handleLogout} variant="contained" color="error">
        Logout
      </Button>
        </ul>

          <form
            onSubmit={handleSearch}
            className="flex items-center space-x-2 bg-gray-400"
          >
            <input
              type="text"
              placeholder="Search username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-full text-sm text-black focus:outline-none"
            />
            <button
              type="submit"
              className="text-white font-semibold hover:text-purple-300 transition"
            >
              Chat
            </button>
          </form>
       
      </div>
    </nav> }
    </>
  );
};

const NavItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="relative group transition duration-300 ease-in-out"
    >
      <span className="group-hover:text-purple-300 transition">{label}</span>
      <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>
);

export default Navbar;
