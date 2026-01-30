import express from "express";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.route.js";
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(201).json("hello world");
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
