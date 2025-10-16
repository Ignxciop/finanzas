import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "./pages/auth/Auth.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function AppRoutes() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <nav
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1rem",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
            </nav>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
