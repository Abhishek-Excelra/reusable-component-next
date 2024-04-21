import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await axios.post("http://13.200.179.225:8002/login", {
        username: username,
        password: password,
      });
      // Redirect to dashboard on successful login
      history.push("/dashboard", { user: response.data[0] });
    } catch (error) {
      // Handle login errors
      setError("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  return (
    <>
      <div className="mt-20">
        <center>
          <img src="https://www.excelra.com/wp-content/uploads/2022/09/Excelra-Logo_1@3x.png" height='auto' width='100px' alt='excelra'/>
        </center>
      </div>
      <form
        onSubmit={handleLogin}
        className="max-w-sm mt-10 mx-auto p-6 bg-white rounded-lg shadow-xl"
      >
        <input
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
          required
        />
        <div className="relative">
          <input
            className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 9a6 6 0 0112 0v2a6 6 0 01-12 0V9z"
                />
              </svg>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex">
          <button
            type="button"
            onClick={handleLogin} // Updated to handleLogin
            className="w-full px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleReset} // Updated to handleReset
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
