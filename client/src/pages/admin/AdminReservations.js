import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const ReservationsAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [filters, setFilters] = useState({ date: "", userId: "", pitchId: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await API.get("/admin/reservations");
        setReservations(res.data);
        setFilteredReservations(res.data);
      } catch (err) {
        setError("Failed to load reservations.");
      }
    };
    fetchReservations();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = reservations;

    if (filters.date) {
      filtered = filtered.filter((res) => res.date === filters.date);
    }
    if (filters.userId) {
      filtered = filtered.filter((res) => res.userId?._id === filters.userId);
    }
    if (filters.pitchId) {
      filtered = filtered.filter((res) => res.pitchId?._id === filters.pitchId);
    }

    setFilteredReservations(filtered);
  };

  const deleteReservation = async (id) => {
    try {
      await API.delete(`/admin/reservations/${id}`);
      setReservations(reservations.filter((res) => res._id !== id));
      setFilteredReservations(filteredReservations.filter((res) => res._id !== id));
    } catch (err) {
      alert("Failed to delete reservation.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Reservations</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Reservations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium text-gray-600">Date:</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600">User:</label>
            <select
              name="userId"
              value={filters.userId}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Users</option>
              {Array.from(
                new Map(
                  reservations
                    .map((res) => res.userId)
                    .filter(Boolean)
                    .map((user) => [user._id, user])
                ).values()
              ).map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} - {user.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-600">Pitch:</label>
            <select
              name="pitchId"
              value={filters.pitchId}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Pitches</option>
              {Array.from(
                new Map(
                  reservations
                    .map((res) => res.pitchId)
                    .filter(Boolean)
                    .map((pitch) => [pitch._id, pitch])
                ).values()
              ).map((pitch) => (
                <option key={pitch._id} value={pitch._id}>
                  {pitch.name} - {pitch.city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Reservation List */}
      <ul className="space-y-4">
        {filteredReservations.map((res) => (
          <li
            key={res._id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <span>
              <strong>{res.date}</strong> at <strong>{res.hour}</strong> - Pitch:{" "}
              {res.pitchId?.name || "Unknown"} (User: {res.userId?.username} -{" "}
              {res.userId?.email})
            </span>
            <button
              onClick={() => deleteReservation(res._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ReservationsAdmin;
