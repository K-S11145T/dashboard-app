import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", { withCredentials: true });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log("Logout Error: ", err.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn cursor-pointer btn-primary">Logout</button>
    </div>
  );
};

export default Logout;