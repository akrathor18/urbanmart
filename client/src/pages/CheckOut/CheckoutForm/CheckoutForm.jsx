import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/useCartStore";
import ShippingInfo from "../ShippingInfo/ShippingInfo.jsx";
import ShippingMethod from "../ShippingMethod/ShippingMethod.jsx";
import PaymentMethod from "../PaymentMethod/PaymentMethod.jsx";
import CheckoutFormSkeleton from "../CheckoutFormSkeleton/CheckoutFormSkeleton.jsx";
import { mapCartToOrderPayload } from "@/utils/mapPlayload.js";
import { useOrderStore } from "@/store/useOderStore.js";
import { useUserStore } from "@/store/useUserStore.js";
import { useEffect } from "react";
import { createPayment, verifyPayment } from "@/service/payment.service";
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import { formatPrice } from "@/utils/formatPrice.js";

export default function CheckoutForm({ onOrderComplete }) {
  const { placeOder, isPlacingOrder } = useOrderStore();
  const { user, getProfile, loading } = useUserStore();

  useEffect(() => {
    getProfile();
  }, []);

  const cart = useCartStore((s) => s.cart);
  const { clearCart } = useCartStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "RAZORPAY",
      shippingMethod: "standard",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address?.line1 || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.pincode || "",
      });
    }
  }, [user, reset]);

  if (loading) {
    return <CheckoutFormSkeleton />;
  }
  const handleRazorpayPayment = async (orderCode) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay failed to load");
      return;
    }

    const {data} = await createPayment(orderCode);
    console.log(data)
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,

      handler: async function (response) {
        await verifyPayment(response);

        clearCart();
        onOrderComplete(orderCode);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentMethod = watch("paymentMethod");
  const shippingMethod = watch("shippingMethod");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const onSubmit = async (data) => {
    const payload = mapCartToOrderPayload({
      cart,
      formData: data,
    });

    const order = await placeOder(payload);
console.log(order)
    if (!order) return;

    // COD flow
    if (data.paymentMethod === "cod") {
      onOrderComplete(order.orderCode);
      clearCart();
      return;
    }

    // Razorpay flow
    if (data.paymentMethod === "RAZORPAY") {
      await handleRazorpayPayment(order.orderCode);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 space-y-8"
    >
      <ShippingInfo register={register} errors={errors} />
      <ShippingMethod register={register} subtotal={subtotal} />
      <PaymentMethod register={register} />
      <button
        disabled={!isValid || isPlacingOrder}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold disabled:bg-blue-400"
      >
        {isPlacingOrder
          ? "Placing order..."
          : paymentMethod === "card"
            ? `Pay ${formatPrice(subtotal)}`
            : "Place Order"}
      </button>
    </form>
  );
}
