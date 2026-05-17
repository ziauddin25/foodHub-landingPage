import { useCart } from "../../../context/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <section className="bg-black min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Cart Items ({cartItems.length})
      </h1>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] p-5 rounded-xl flex items-center gap-5"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-xl font-bold">{item.title}</h2>

              <p className="text-yellow-400 text-lg">
                ${item.price}
              </p>

              <p className="text-gray-400">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}