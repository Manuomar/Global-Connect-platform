
import React, { useContext, useState } from 'react';
import logo from "../assets/GCF.jpg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from '../context/AuthContext';
import axios from "axios";
import { userDataContext } from '../context/userContext';

function Signup() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { setUserData } = useContext(userDataContext);
  let navigate = useNavigate();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        { firstName, lastName, userName, email, password },
        { withCredentials: true }
      );
      console.log(result);
      setUserData(result.data);
      navigate("/");
      setErr("");
      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setUserName("");
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="h-[100px] object-contain" />
      </div>

      {/* Signup Form */}
      <form
        className="w-[90%] max-w-[400px] bg-white shadow-lg rounded-xl px-6 py-8 flex flex-col gap-4"
        onSubmit={handleSignUp}
      >
        <h1 className="text-gray-800 text-3xl font-bold mb-4 text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="First Name"
          required
          className="w-full h-[50px] border border-gray-300 focus:border-[#24b2ff] focus:ring-2 focus:ring-[#24b2ff] outline-none text-gray-800 text-[16px] px-4 rounded-lg transition-all"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          required
          className="w-full h-[50px] border border-gray-300 focus:border-[#24b2ff] focus:ring-2 focus:ring-[#24b2ff] outline-none text-gray-800 text-[16px] px-4 rounded-lg transition-all"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          required
          className="w-full h-[50px] border border-gray-300 focus:border-[#24b2ff] focus:ring-2 focus:ring-[#24b2ff] outline-none text-gray-800 text-[16px] px-4 rounded-lg transition-all"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full h-[50px] border border-gray-300 focus:border-[#24b2ff] focus:ring-2 focus:ring-[#24b2ff] outline-none text-gray-800 text-[16px] px-4 rounded-lg transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full h-[50px] border border-gray-300 focus-within:border-[#24b2ff] focus-within:ring-2 focus-within:ring-[#24b2ff] rounded-lg relative transition-all">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full h-full outline-none text-gray-800 text-[16px] px-4 pr-16 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#24b2ff] cursor-pointer font-medium text-sm select-none hover:underline"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* Error Message */}
        {err && (
          <p className="text-center text-red-500 text-sm font-medium mt-1">
            *{err}
          </p>
        )}

        <button
          className="w-full h-[50px] rounded-full bg-[#24b2ff] hover:bg-[#1d9be0] transition-all text-white font-semibold mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-[#24b2ff] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
