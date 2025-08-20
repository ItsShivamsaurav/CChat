import { createContext, useContext, useState, useEffect, use } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [messages, setMessages] = useState([]);


  // PROFILE
  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) setProfile(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [profile]);


  // RECENT CHATS
  useEffect(() => {
    const storedChats = localStorage.getItem("recentChats");
    if (storedChats) {
      setRecentChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    // Save recentChats to localStorage whenever it updates
    localStorage.setItem("recentChats", JSON.stringify(recentChats));
  }, [recentChats]);


  // MESSAGES
  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever it updates
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);


  // LOGOUT FUNCTION
  const logout = () => {
    setProfile(null);
    setRecentChats([]);
    setMessages([]);
    localStorage.removeItem("profile");
    localStorage.removeItem("recentchats");
    localStorage.removeItem("messages");
  };

  return (
    <UserContext.Provider
      value={{ profile, setProfile, recentChats, setRecentChats, messages,setMessages, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
