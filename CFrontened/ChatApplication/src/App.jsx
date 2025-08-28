import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home";
import ChatInterface from "./components/chatInterface";
import ProfileView from "./components/profile";
import RecentChats from "./components/recentChat";

import { UserProvider, useUser } from "./components/context";
import Navbar from "./components/navbar";
import GlobalChat from "./components/globalchatinterface";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  
  return (
    <>
      <UserProvider>
        <Router>
        
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:userId" element={ <ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/:userid1/recentchats" element={<ProtectedRoute><RecentChats /></ProtectedRoute>} />
            <Route path="/:userid1/globalchats" element={<ProtectedRoute><GlobalChat /></ProtectedRoute>} />
            <Route path="/:userid1/profileview/" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
            <Route
              path="/:userid1/:userid2/:chatroomId/chatinterface"
              element={<ProtectedRoute> <ChatInterface /></ProtectedRoute>}
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
