import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to login first.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://dashboard-app-fj5f.onrender.com/api/users/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mt-10 w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This is the dashboard page.
          </p>
        </div>
        {userData && (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
