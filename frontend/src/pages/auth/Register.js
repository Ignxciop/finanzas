import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error de registro");
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          placeholder="Apellido"
          value={form.lastname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        ¿Ya tienes cuenta?{" "}
        <a
          href="/login"
          style={{
            color: "#1976d2",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Inicia sesión
        </a>
      </div>
    </div>
  );
}
