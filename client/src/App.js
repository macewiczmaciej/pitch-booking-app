import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PitchDetails from "./pages/PitchDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPitches from "./pages/admin/AdminPitches";
import AdminReservations from "./pages/admin/AdminReservations";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPanel from "./pages/UserPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Główne trasy */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/pitch/:id" element={<PitchDetails />} />
        <Route path="*" element={<NotFound />} />

        {/* Trasy panelu administratora */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pitches"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPitches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminReservations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
