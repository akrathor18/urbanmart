export default function ShippingMethod({ register}) {
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
          Standard — ₹ Free
        </span>
      </label>

      {/* <label className="block border p-4 rounded-lg cursor-pointer">
        <input type="radio" {...register("shippingMethod")} value="express" />
        <span className="ml-2">Express — ₹ {1329}</span>
      </label> */}
    </section>
  );
}
