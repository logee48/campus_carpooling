import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:1234/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success } = data;
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirect to the forgot password page
  };

  return (
    // <div className="form_container">
    //   <h2>Login Account</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={email}
    //         placeholder="Enter your email"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         placeholder="Enter your password"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <button type="submit">Submit</button>
    //     <span>
    //       Don't have an account ? <Link to={"/signup"}>Signup</Link>
    //     </span>
    //   </form>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900 text-textPrimary dark:text-white px-4">
      <div className="w-full max-w-md bg-secondary dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Campus Carpooling
        </h1>
        <h2 className="text-xl font-semibold text-center mb-4">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-700 dark:border-gray-600 rounded bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-primary hover:bg-green-600 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:underline hover:text-green-400"
          >
            Forgot Password?
          </button>
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline hover:text-green-400"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

