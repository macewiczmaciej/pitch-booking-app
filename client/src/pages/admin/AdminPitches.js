import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const PitchesAdmin = () => {
  const [pitches, setPitches] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", city: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const res = await API.get("/admin/pitches");
        setPitches(res.data);
      } catch (err) {
        alert("Failed to load pitches.");
      }
    };
    fetchPitches();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/admin/pitches/${form.id}`, form);
        setPitches(
          pitches.map((pitch) =>
            pitch._id === form.id ? { ...pitch, ...form } : pitch
          )
        );
      } else {
        const newPitch = await API.post("/admin/pitches", form);
        setPitches([...pitches, newPitch.data]);
      }
      setForm({ id: null, name: "", city: "", address: "" });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to save pitch.");
    }
  };

  const editPitch = (pitch) => {
    setForm({ id: pitch._id, name: pitch.name, city: pitch.city, address: pitch.address });
    setIsEditing(true);
  };

  const deletePitch = async (id) => {
    try {
      await API.delete(`/admin/pitches/${id}`);
      setPitches(pitches.filter((pitch) => pitch._id !== id));
    } catch (err) {
      alert("Failed to delete pitch.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Pitches</h1>
      <form onSubmit={submitForm} className="space-y-4 bg-white p-4 rounded shadow-md">
        <div>
          <label className="block font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">City:</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
        <label>Photo URL:</label>
        <input
          type="text"
          name="photo"
          value={form.photo || ""}
          onChange={handleFormChange}
          placeholder="Enter image URL"
          className="w-full p-2 border border-gray-300 rounded"

        />
      </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Pitch" : "Add Pitch"}
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {pitches.map((pitch) => (
          <li
            key={pitch._id}
            className="flex items-center justify-between p-4 bg-white rounded shadow"
          >
            <span>
              {pitch.name} - {pitch.city} - {pitch.address}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => editPitch(pitch)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deletePitch(pitch._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PitchesAdmin;
