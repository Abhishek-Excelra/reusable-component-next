import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", { username, password });
      // Handle successful login
      console.log(response.data);
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mt-36 mx-[450px] p-6 bg-white rounded-lg shadow-xl"
    >
      <input
        className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
