import { useState } from "react";
import RegisterModal from "./register";
import LoginModal from "./login";
import { useUser } from "./context";

const HomePage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showlogin, setShowLogin] = useState(false);
  const { profile, setProfile } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center text-white px-6 relative">
      <div className="max-w-3xl text-center space-y-8 z-10">
        <h1 className="text-5xl font-extrabold tracking-wide leading-tight">
          Welcome to <span className="text-purple-400">CChat</span>
        </h1>
        <p className="text-lg text-white/80 leading-relaxed">
          Where conversations transcend boundaries. Join a community where every
          word matters.
        </p>
        <div className="flex justify-center space-x-6">
          {!profile && (
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-800 hover:to-pink-600 transition-all duration-300"
            >
              Log In
            </button>
          )}

          {!profile && (
            <button
              onClick={() => setShowRegister(true)}
              className="px-6 py-3 border border-purple-400 rounded-lg font-semibold hover:bg-purple-600 hover:border-transparent transition-all duration-300"
            >
              Register
            </button>
          )}
        </div>
      </div>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showlogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default HomePage;
