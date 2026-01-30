import bcrypt from "bcrypt";

import { prisma } from "../config/db.js";

const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPass = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPass,
    },
  });
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
};

export { registerUser, loginUser };
