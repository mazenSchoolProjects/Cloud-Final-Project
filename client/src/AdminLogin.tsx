import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setCookie] = useCookies(['token']);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/login', { username, password });
      if (response.status === 200) {
        // Login successful, store token in cookies and trigger callback
        setCookie('token', response.data.token, { path: '/' });
        onLoginSuccess();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
