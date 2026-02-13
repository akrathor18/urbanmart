export const formatPrice = (amount) => {
  const amountInRupee = amount/100
    return `₹ ${amountInRupee.toLocaleString("en-IN")}`;
  };