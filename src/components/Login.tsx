import React, { useState } from 'react';
import './Login.css'

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'ex@gmail.com' && password === 'ad123') {
      onLogin();
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-200">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-2 rounded-full hover:bg-gray-200 transition">
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => window.location.href = '/signin'}
            className="text-sm text-white hover:underline"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
