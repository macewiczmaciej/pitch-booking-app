import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    isAdmin: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "isAdmin" ? e.target.checked : value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { 
        username: form.username,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        isAdmin: form.isAdmin,
      };
  
      if (form.password) {
        // Include password only if it is not empty
        dataToSend.password = form.password;
      }
  
      if (isEditing) {
        // Update user
        await API.put(`/users/${form.id}`, dataToSend);
        setUsers(
          users.map((user) =>
            user._id === form.id
              ? { ...user, ...dataToSend }
              : user
          )
        );
      } else {
        // Add new user
        const newUser = await API.post("/users", dataToSend);
        setUsers([...users, newUser.data]);
      }
  
      setForm({
        id: null,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        isAdmin: false,
      });
      setIsEditing(false);
    } catch (err) {
      alert("Failed to save user.");
    }
  };
  

  const editUser = (user) => {
    setForm({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      isAdmin: user.isAdmin,
      password: "",
    });
    setIsEditing(true);
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      <form onSubmit={submitForm} className="space-y-4 bg-white p-4 rounded shadow-md">
        <div>
          <label className="block font-medium text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
            required={!isEditing}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Admin:</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={form.isAdmin}
            onChange={handleFormChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <span>
              <strong>{user.username}</strong> - {user.email} (Admin: {user.isAdmin ? "Yes" : "No"})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => editUser(user)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default UsersAdmin;
