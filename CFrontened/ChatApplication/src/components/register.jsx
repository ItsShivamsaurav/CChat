import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

const RegisterPage = ({ onClose }) => {
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] =useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otpSend, setOtpSend] = useState(true);
  const [otpverify, setOtpVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const axiosPostData = async () => {
    setLoading(true);
    const postData = {
      name,
      userName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ORIGIN}/newuser/register`,
        postData
      );
      if (response.status === 200) {
        console.log(response.data);
        setAlert({ type: "success", message: "User registered successfully!" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axiosPostData();
    e.target.reset();
  };

  const handlesubmitSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);       
    try {
      const response = await axios.post(
       `${import.meta.env.VITE_ORIGIN}/newuser/sendotp`,
        { email }
      );
      if (response.status === 200) {
        console.log(response.data);
        setAlert({ type: "success", message: "otp send successfully!" });
        setOtpSend(false);
        setOtpVerify(true);
        setOtpVerified(false);
      }
    } catch (error) {
      setAlert({ type: "error", message: "otp send failed. Try again." });
    } finally {
      setLoading(false);
    }
    e.target.reset();
  };

  const handlesubmitOtpVerify = async (e) => {
    console.log("verifying otp", otp, email);
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ORIGIN}/newuser/verifyotp`,
        { email, otp }
      );
      if (response.status === 200) {
        console.log(response.data);
        setAlert({ type: "success", message: "otp verified successfully!" });
        setOtpVerified(true);
        setOtpVerify(false);    
        setOtpSend(false);
      }
    } catch (error) {
      setAlert({ type: "error", message: "otp verify failed. Try again." });
    } finally {
      setLoading(false);
    }
    e.target.reset();
  };


  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => {
        clearTimeout(timer);
        navigate("/");
      };
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
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

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


        {otpVerified && <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              UserName
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="john_doe123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              disabled 
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
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-600 rounded-lg font-semibold transition-all duration-300"
          >
            Register
          </button>
        </form>}

        {otpSend && <form className="space-y-4" onSubmit={handlesubmitSendOtp}>
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
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-600 rounded-lg font-semibold transition-all duration-300"
          >
            sendOtp
          </button>
        </form>}
        {otpverify && <form className="space-y-4" onSubmit={handlesubmitOtpVerify}>
           <div>
            <label className="block text-sm font-medium mb-1" htmlFor="otp">
              Otp
            </label>
            <input
              type="text"
              id="otp"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-600 rounded-lg font-semibold transition-all duration-300"
          >
            verify otp
          </button>
        </form>}


        <p className="mt-6 text-sm text-center text-white/80">
          Already have an account?{" "}
          <a href="#" className="text-purple-300 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
