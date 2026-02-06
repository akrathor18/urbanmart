export const mapUserToForm = (user) => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  email: user.email || "",
  phone: user.phone || "",
  address: user.address?.line1 || "",
  city: user.address?.city || "",
  state: user.address?.state || "",
  zipCode: user.address?.pincode || "",
});

export const mapFormToProfilePayload = (data) => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phone: data.phone,
  address: {
    fullName: `${data.firstName} ${data.lastName}`,
    phone: data.phone,
    line1: data.address,
    city: data.city,
    state: data.state,
    pincode: data.zipCode,
  },
});


export const mapFormToOrderPayload = ({ data, productId, quantity }) => {
  console.log(data);

  return {
    productId,
    quantity,
    payment: data.paymentMethod.toUpperCase(),
    address: {
      fullName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      line1: data.address,
      city: data.city,
      state: data.state,
      pincode: data.zipCode,
      country: "India",

    },
  };
};

