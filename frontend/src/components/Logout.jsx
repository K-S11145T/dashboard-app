import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`/users/logout`, { withCredentials: true }); 
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Failed to log out. Please try again.");
      console.log("Logout Error: ", err.message);
    }
  };

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={handleLogout}
        className={`btn cursor-pointer text-white btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default Logout;
