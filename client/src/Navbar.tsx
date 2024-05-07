// Navbar.tsx
import React from 'react';

interface NavbarProps {
  onStudentsListClick: () => void;
  onAdminLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStudentsListClick, onAdminLoginClick }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button className="text-white bg-gray-900 px-3 py-1 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-300" onClick={onStudentsListClick}>Students List</button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300" onClick={onAdminLoginClick}>Admin</button>
      </div>
    </nav>
  );
};

export default Navbar;
