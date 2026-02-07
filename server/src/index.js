import express from "express";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import orderRoutes from "./routes/order.route.js";
import profileRoutes from "./routes/profile.route.js"
import cartRoutes from "./routes/cart.route.js"
import wishlistRoutes from './routes/wishlist.route.js'
import cookieParser from "cookie-parser";

import cors from 'cors'
const app = express();
const prisma = new PrismaClient();
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(201).json("hello world");
});
app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/user", profileRoutes);
app.use("/cart", cartRoutes)
app.use('/wishlist', wishlistRoutes)

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
