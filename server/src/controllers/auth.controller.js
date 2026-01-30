import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body.email, req.body.password);
        res.status(200).json({
            message: "Login successful",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}