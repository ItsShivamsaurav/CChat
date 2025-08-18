import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('profile');
    if (storedUser) setProfile(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }
  }, [profile]);


  useEffect(() => {
  const storedChats = localStorage.getItem('recentChats');
  if (storedChats) {
    setRecentChats(JSON.parse(storedChats));
  }
}, []);

useEffect(() => {
  // Save recentChats to localStorage whenever it updates
  localStorage.setItem('recentChats', JSON.stringify(recentChats));
}, [recentChats]);


    const logout = () => {
    setProfile(null);
    setRecentChats([]);
    localStorage.removeItem('profile');
    localStorage.removeItem('recentchats');
  };


  return (
    <UserContext.Provider value={{ profile, setProfile, recentChats, setRecentChats ,logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
