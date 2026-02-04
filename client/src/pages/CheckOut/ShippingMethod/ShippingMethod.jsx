export default function ShippingMethod({ register, subtotal }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>

      <label className="block border p-4 rounded-lg mb-3 cursor-pointer">
        <input
          type="radio"
          {...register("shippingMethod")}
          value="standard"
          defaultChecked
        />
        <span className="ml-2">
          Standard — ₹ {subtotal > 4000 ? "Free" : 829}
        </span>
      </label>

      {/* <label className="block border p-4 rounded-lg cursor-pointer">
        <input type="radio" {...register("shippingMethod")} value="express" />
        <span className="ml-2">Express — ₹ {1329}</span>
      </label> */}
    </section>
  );
}
