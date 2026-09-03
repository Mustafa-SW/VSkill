import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile";
import styled from "styled-components";
import AccountDetails from "./pages/AccountDetails";

const AppScaler = styled.div`
  zoom: 75%; 
  @supports not (zoom: 75%) {
    transform: scale(0.75);
    transform-origin: top center;
    width: 133.33%; /
  }

  min-height: 100vh;
`;

/* 🔐 Protected Route */
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("vskill_current_user");

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AppScaler>
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
  </AppScaler>
  );
}

export default App;