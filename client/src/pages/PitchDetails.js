import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CalendarView from "../components/CalendarView";
import API from "../api/axios";

const PitchDetails = () => {
  const { id } = useParams();
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: "",
    hour: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("You must be logged in to make a reservation");
      return;
    }
  
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await API.post("/reservations", {
        pitchId: id,
        userId,
        date: selectedDateTime.date,
        hour: selectedDateTime.hour,
      });
      setSuccess("Reservation created successfully!");
      setError(null);
      setRefresh(!refresh); // Refresh calendar after reservation
      setSelectedDateTime({ date: "", hour: "" }); // Reset selected slot
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create reservation");
      setSuccess(null);
    }
  };
  

  const handleDateSelect = (date, hour) => {
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${hour}:00`);
    if (selectedDateTime <= now) {
      setError("You can only select future time slots.");
      return;
    }
    setSelectedDateTime({ date, hour });
    setError(null);
    setSuccess(null);
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pitch Details</h1>

      {/* Calendar View */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <CalendarView pitchId={id} onDateSelect={handleDateSelect} key={refresh} setError={setError} />
      </div>

      {/* Selected Slot */}
      {selectedDateTime.date && selectedDateTime.hour && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Slot</h3>
          <p className="text-gray-600">
            <strong>Date:</strong> {selectedDateTime.date}
          </p>
          <p className="text-gray-600">
            <strong>Hour:</strong> {selectedDateTime.hour}
          </p>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reserve
          </button>
        </div>
      )}

      {/* Error and Success Messages */}
      {error && (
        <div className="text-red-500 mt-4 p-2 bg-red-100 rounded shadow">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 mt-4 p-2 bg-green-100 rounded shadow">
          {success}
        </div>
      )}
    </div>
  );
};

export default PitchDetails;
