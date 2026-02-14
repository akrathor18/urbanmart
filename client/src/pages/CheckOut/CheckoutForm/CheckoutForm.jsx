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
  try {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay failed to load. Please refresh and try again.");
      return;
    }

    const { data } = await createPayment(orderCode);
    
    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: "Your Store Name",
      description: `Order ${orderCode}`,
      
      handler: async function (response) {
        try {
          await verifyPayment(response);
          clearCart();
          onOrderComplete(orderCode);
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support with order code: " + orderCode);
        }
      },
      
      modal: {
        ondismiss: function() {
          alert("Payment cancelled. Your order is still pending.");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert("Payment failed: " + response.error.description);
    });
    rzp.open();
    
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Failed to initiate payment. Please try again.");
  }
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
    if (!order) return;

    // COD flow
    if (data.paymentMethod === "COD") {
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
          : paymentMethod === "RAZORPAY"
  ? `Pay ${formatPrice(subtotal)}`
  : "Place Order"}
      </button>
    </form>
  );
}
