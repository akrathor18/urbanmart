import { prisma } from "../config/db.js";

export const getProfile = async (userId) => {
  if (!userId) throw new Error("UserId required");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      addresses: {
        where: { isDefault: true },
        select: {
          fullName: true,
          phone: true,
          line1: true,
          line2: true,
          city: true,
          state: true,
          pincode: true,
          country: true,
        },
      },
    },
  });
  if (!user) throw new Error("User not found");
  return {
    ...user,
    address: user.addresses[0] || null,
    addresses: undefined,
  };
};

export const updateProfile = async (userId, data) => {
  const { firstName, lastName, email, phone, address } = data;
  return prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    if (address) {
      await tx.address.upsert({
        where: {
          userId_isDefault: {
            userId,
            isDefault: true,
          },
        },
        //if exist then update otherwise -> create
        update: {
          fullName: address.fullName,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        create: {
          userId,
          fullName: address.fullName,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: "India",
          isDefault: true,
        },
      });
    }

    const updatedUser = await tx.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    addresses: {
      where: { isDefault: true },
      select: {
        fullName: true,
        phone: true,
        line1: true,
        line2: true,
        city: true,
        state: true,
        pincode: true,
        country: true,
      },
    },
  },
});

return {
  ...updatedUser,
  address: updatedUser.addresses[0] || null,
  addresses: undefined,
};

  });
};
