import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile";
import AccountDetails from "./pages/AccountDetails";


/* 🔐 Protected Route */
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("vskill_current_user");

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/account-details" element={<AccountDetails />}
/>
      
      {/* Protected Route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;