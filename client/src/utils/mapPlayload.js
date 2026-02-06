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


export const mapCartToOrderPayload = ({ cart, formData }) => ({
  payment: formData.paymentMethod.toUpperCase(),
  address: {
    fullName: `${formData.firstName} ${formData.lastName}`,
    phone: formData.phone,
    line1: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.zipCode,
    country: "India",
  },
  items: cart.map(item => ({
    productId: item.id,
    quantity: item.quantity,
  })),
});

