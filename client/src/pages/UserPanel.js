import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import AlertMessage from "../components/AlertMessage";

const UserPanel = () => {
  const { id: userId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await API.get(`/users/${userId}`);
        setUserData(userRes.data);

        const reservationsRes = await API.get(`/users/${userId}/reservations`);
        setReservations(Array.isArray(reservationsRes.data) ? reservationsRes.data : []);
      } catch (err) {
        setError("Failed to load user data.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveUserData = async () => {
    try {
      await API.put(`/users/${userId}`, userData);
      setSuccess("User data updated successfully!");
    } catch (err) {
      setError("Failed to update user data.");
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">User Panel</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Dane użytkownika */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={saveUserData}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          {<AlertMessage type="error" message={error}></AlertMessage>}
          {<AlertMessage type="success" message={success}></AlertMessage>}
        </div>
      </div>

      {/* Lista rezerwacji */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Your Reservations</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-600">You have no reservations.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li
              key={res._id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Date:</strong> {res.date}
                </p>
                <p>
                  <strong>Hour:</strong> {res.hour}
                </p>
                <p>
                  <strong>Pitch:</strong> {res.pitchId?.name || "Unknown"} in{" "}
                  {res.pitchId?.city || "Unknown"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPanel;
