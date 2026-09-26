import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';   

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', 
        { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (response.data.user.role === "customer") {
          navigate("/home");
        } else {
          navigate("/Employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div 
      className="flex flex-col items-center h-screen justify-center 
                 bg-gradient-to-b from-black from-50% to-gray-100 to-50% space-y-6"
    >
      <h2 className="font-Lora text-3xl text-white">Life    Fashion</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border"
              placeholder="******" 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-black">Forgot Password?</a>
          </div>
          <div className="mb-4">
            <button
              type="submit" 
              className="w-full bg-black text-white py-2"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don't have an account? <a href="/signup" className="text-teal-500">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;