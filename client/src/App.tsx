import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import StudentsList from './StudentsList';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import "./App.css";
import background from "./assets/background.jpg";

const App: React.FC = () => {
  const [showStudentsList, setShowStudentsList] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:3000/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          if (response.status === 200) {
            setIsAdminLoggedIn(true);
          }
        })
        .catch(error => {
          setIsAdminLoggedIn(false);
          console.log(error);
        });
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  const handleStudentsListClick = () => {
    setShowStudentsList(true);
    setShowAdminLogin(false); 
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
    setShowStudentsList(false); 
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false); 
  };

  return (
    <div style={{ 
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      minHeight: "100vh" 
    }}>
      <Navbar onStudentsListClick={handleStudentsListClick} onAdminLoginClick={handleAdminLoginClick} />
      <div className="p-4">
        {showStudentsList ? <StudentsList /> : null}
        {isAdminLoggedIn ? <AdminDashboard /> : null}
        {showAdminLogin && !isAdminLoggedIn && <div className="flex justify-center items-center h-screen"><AdminLogin onLoginSuccess={handleAdminLoginSuccess} /></div>}
      </div>
    </div>
  );
};

export default App;
