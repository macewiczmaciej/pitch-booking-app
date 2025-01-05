import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUserContext();

  return (
    <nav className="bg-blue-600 p-6 shadow-lg sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold tracking-wide hover:text-gray-300 transition-colors"
        >
          Pitch Booking App
        </Link>
        <div className="flex space-x-6 text-lg">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to={`/user/${user._id}`}
                className="text-white hover:text-gray-300 transition-colors"
              >
                My Account
              </Link>
              {user.isAdmin && (
                <>
                  <Link
                    to="/admin/users"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Manage Users
                  </Link>
                  <Link
                    to="/admin/pitches"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Manage Pitches
                  </Link>
                  <Link
                    to="/admin/reservations"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Manage Reservations
                  </Link>
                </>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link
              to="/login"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
