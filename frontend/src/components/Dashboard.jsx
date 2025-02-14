import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required!", {
          position: "top-center",
          autoClose:1000,
        });
        setTimeout(() => {
          navigate('/login');

        },1000)
        return;
      }

      try {
        const response = await axios.get('/users/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });

        if (response.data) {
          setUserData(response.data);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          toast.warning("Session expired! Please login again.", {
            position: "top-center",
            autoClose:1000,
          });
          setTimeout(() => {
            navigate('/login');

          },1000)
        } else {
          toast.error(err.response?.data?.message || "Failed to fetch data", {
            position: "top-center",
            autoClose:1000,
          });
          setTimeout(() => {
            navigate('/login');

          },1000)
          
          
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome, {userData?.name}!
          </h2>
          <p className="mt-2 text-center text-gray-600">Your Profile Details</p>
        </div>

        {userData && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
