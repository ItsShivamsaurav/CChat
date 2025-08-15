import {createContext, useContext,useState } from "react";

export const UserContext= createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);         
  const [recentChats, setRecentChats] = useState([]); 
  return (
    <UserContext.Provider value={{ profile, setProfile, recentChats, setRecentChats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser =()=>{
    return useContext(UserContext);
};