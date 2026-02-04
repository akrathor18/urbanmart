import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/useCartStore";
import ShippingInfo from "../ShippingInfo/ShippingInfo.jsx";
import ShippingMethod from "../ShippingMethod/ShippingMethod.jsx";
import PaymentMethod from "../PaymentMethod/PaymentMethod.jsx";
import CardInfo from "../CardInfo/CardInfo.jsx";

export default function CheckoutForm({ onOrderComplete }) {
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "card",
      shippingMethod: "standard",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const shippingMethod = watch("shippingMethod");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping =
    shippingMethod === "express" ? 1329 : subtotal > 4000 ? 0 : 829;

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const onSubmit = async () => {
    // later → API call here
    await new Promise((r) => setTimeout(r, 1200));

    clearCart();
    onOrderComplete();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 space-y-8"
    >
      <ShippingInfo register={register} errors={errors} />
      <ShippingMethod register={register} subtotal={subtotal} />
      <PaymentMethod register={register} />

      {paymentMethod === "card" && (
        <CardInfo register={register} errors={errors} setValue={setValue} />
      )}

      <button
        disabled={!isValid}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold disabled:bg-blue-400"
      >
        {paymentMethod === "card" ? `Pay ₹${total}` : "Place Order"}
      </button>
    </form>
  );
}
