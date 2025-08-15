import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/login'
import RegisterPage from './components/register'
import HomePage from './components/home'
import ChatInterface from './components/chatInterface'
import ProfileView from './components/profile'
import RecentChats from './components/recentChat'
import { UserProvider, useUser } from './components/context'
import Navbar from "./components/navbar";

function App() {
  const [count, setCount] = useState(0)
  const {profile,setProfile} = useUser() || {};

  return (
    <>
    <UserProvider>
      
      <Router>
        {/* {profile && <Navbar/>
        } */}
        <Navbar/>
        
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:userId" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/> }/>
          <Route path="/register" element={<RegisterPage/> }/>
          <Route path="/:userid1/:userid2/chatinterface" element={<ChatInterface/> }/>
          <Route path="/:userid1/recentchats" element={<RecentChats/>}/>
          <Route path="/:userid1/profileview/" element={<ProfileView/>}/>
        </Routes>
      </Router>
    </UserProvider>
    </>
  )
}

export default App
