import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const AlertModal = ({ message, onClose, isDarkMode }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-md p-4 rounded-lg shadow-lg z-50 ${
      isDarkMode ? "bg-red-800 text-white" : "bg-red-100 text-red-700"
    }`}>
      <span>{message}</span>
      <button onClick={onClose} className="float-right">
        <X size={20} />
      </button>
    </div>
  );
};

const LoginPage = ({ isDarkMode, onLoginSuccess }) => {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  /* ---------- LOGIN ---------- */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { mobile, password }
      );

      showAlert("Login successful ✅");
      onLoginSuccess(res.data.user);

    } catch {
      showAlert("Invalid credentials ❌");
    }
  };

  /* ---------- REGISTER ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName,
          lastName,
          gender,
          email,
          mobile,
          password
        }
      );

      showAlert("Account created ✅");
      onLoginSuccess(res.data.user);

    } catch (err) {
      showAlert(err.response?.data?.message || "Error ❌");
    }
  };

  const bgColor = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100";

  return (
    <div className={`min-h-screen flex justify-center items-center ${bgColor}`}>

      <AlertModal
        message={alertMessage}
        onClose={() => setAlertMessage("")}
        isDarkMode={isDarkMode}
      />

      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">

        <h1 className="text-2xl text-center text-green-400 mb-4">
          Kisaan AgroCare
        </h1>

        <h2 className="text-center mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* ---------- REGISTER ---------- */}
        {isRegister ? (
          <form onSubmit={handleRegister} className="space-y-3">

            <input placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 rounded" required />

            <input placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 rounded" required />

            <input placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded" required />

            <input placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 rounded" required />

            <input type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded" required />

            <select value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 rounded" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button className="w-full bg-green-500 p-2 rounded">
              Register
            </button>

          </form>
        ) : (

        /* ---------- LOGIN ---------- */
          <form onSubmit={handleLogin} className="space-y-3">

            <input placeholder="Mobile / Email"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 rounded" required />

            <input type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded" required />

            <button className="w-full bg-green-500 p-2 rounded">
              Login
            </button>

          </form>
        )}

        {/* Toggle */}
        <p className="text-center mt-4">
          {isRegister ? "Already have account?" : "New user?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-400 ml-2"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;