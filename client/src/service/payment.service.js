import api from "@/api/axios"; // assuming you have axios instance

export const createPayment = (orderCode) => {
  return api.post("/payment/create", { orderCode });
};

export const verifyPayment = (payload) => {
  return api.post("/payment/verify", payload);
};
