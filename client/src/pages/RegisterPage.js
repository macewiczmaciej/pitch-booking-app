import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      setSuccess("You are successfuly registered. You can now log in!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-100">
  <div className="w-full max-w-md bg-white rounded shadow-md p-6">
    <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">Register</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Register
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {/* Error and Success Messages */}
   <AlertMessage type="error" message={error} />
    <AlertMessage type="success" message={success} />
    </form>
  </div>
</div>

  );
};

export default RegisterPage;
