import { loadRazorpayScript } from "@/utils/loadRazorpay";
import { createPayment, verifyPayment } from "@/service/payment.service";
import { usePaymentStore } from "@/store/usePaymentStore";
import { useNavigate } from "react-router-dom";

export default function PaymentButton({ orderCode }) {
  const { loading, setLoading } = usePaymentStore();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await createPayment(orderCode);

      const options = {
        key: data.data.key,
        amount: data.data.amount,
        currency: data.data.currency,
        order_id: data.data.razorpayOrderId,

        handler: async function (response) {
          await verifyPayment(response);
          navigate(`/order-success/${orderCode}`);
        },

        theme: {
          color: "#111827",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        alert("Payment failed ❌");
      });

      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
