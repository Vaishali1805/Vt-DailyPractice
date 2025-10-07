import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    
  }

  const handleLogin = () => {

  }
  return (
    <form onSubmit={isRegister ? handleRegister : handleLogin} className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">{isRegister ? "Create Account" : "Login"}</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">{isRegister ? "Looks like you are new here!" : "We are glad to see you again!"}</p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event?.target.value)}
            className="w-full p-2 border border-gray-400 rounded mt-2"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 text-sm" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            className="w-full p-2 border border-gray-400 rounded mt-2"
            placeholder="Enter Your Password"
            required
          />
        </div>
        {isRegister ? (
          <div className="mb-4">
            <label className="text-gray-600 text-sm" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full p-2 border border-gray-400 rounded mt-2"
              placeholder="Enter Password Again"
              required
            />
          </div>
        ) : (
          ""
        )}
        {error ? <p>{error}</p> : ""}
        {message ? <p>{message}</p> : ""}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          {isRegister ? "Register" : "Login"}
        </button>
        <div>
          <p className="pt-4 text-center text-gray-600 text-sm">
            {isRegister ? "Already have an account ?" : "Don't have an account ?"}{" "}
            <Link to="" onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Login" : "Create Account"}</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
