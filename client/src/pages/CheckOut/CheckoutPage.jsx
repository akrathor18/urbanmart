import { useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import CheckoutForm from "./CheckoutForm/CheckoutForm.jsx"
import OrderSummary from "./OrderSummary/OrderSummary.jsx"
import OrderSuccess from "./OrderSuccess/OrderSuccess.jsx"
import EmptyCart from "../Cart/EmptyCart/EmptyCart.jsx"
export default function Checkout() {
  const cart = useCartStore((s) => s.cart)
  const [orderComplete, setOrderComplete] = useState(false)

  if (cart.length === 0 && !orderComplete) {
    return (
      <EmptyCart/>
    )
  }

  if (orderComplete) {
    return <OrderSuccess />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CheckoutForm onOrderComplete={() => setOrderComplete(true)} />
        <OrderSummary />
      </div>
    </div>
  )
}
