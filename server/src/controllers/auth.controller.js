import * as authService from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully!" });
};
