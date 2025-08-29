import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context";

import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const { profile, setProfile } = useUser();
  // const {token, setToken } = useUser();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosPostData = async () => {
    setLoading(true);
    console.log("Logging in user:", email);
    const postData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ORIGIN}/newuser/login`,
        postData,
        { timeout: 1000 }
      );
       if (response.status === 200) {
        console.log("response: ",response);
        // console.log('response',x);
        setAlert({ type: "success", message: "Verified user." });
        document.cookie = `authToken=${response.data.token}; path=/; secure; samesite=strict`;
        setProfile(response.data.user);
        console.log("profile", response.data);
        navigate(`/${response.data.user.userName}/recentchats`);
      }
      
    } catch (error) {
      console.log("Error in logging...",error);
      setAlert({ type: "error", message: "Login failed. Try again." });
    } finally {
      setLoading(false);
     
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPostData();
    e.target.reset();
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black/3  0 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-[#310e68] via-[#5f0f40] to-[#a4508b] rounded-xl shadow-2xl p-8 w-full max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        {alert && (
          <div className="mb-4">
            <Alert severity={alert.type}>{alert.message}</Alert>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <CircularProgress color="secondary" />
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-600 rounded-lg font-semibold transition-all duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-white/80">
          Don't have an account?{" "}
          <a href="#" className="text-purple-300 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
