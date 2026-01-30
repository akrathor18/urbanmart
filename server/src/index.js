import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: "Ashish",
      email: "ashish@gmail.com",
      password: "123456",
    },
  });
  res.json(user);
});
app.get("/", (req, res) => {
  res.status(201).json("hello world");
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
