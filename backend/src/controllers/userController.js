import prisma from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, lastname, email, password: hashedPassword },
    });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el registro",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};

export const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};
