import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import CheckoutNavbar from '../../checkout/components/CheckoutNavbar';
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
};

export default function Cart() {
  const { cartItems } = useCart();
  const [selectItem, setSelectItem] = useState<CartItem []>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {isSignedIn} = useUser();

  const handleSelect = (item: CartItem) => {
    const exists = selectItem.find(
      (selected: CartItem) => selected.id === item.id
    );

    if (exists) {
      setSelectItem(
        selectItem.filter(
        (selected: CartItem) => selected.id !== item.id
      )
    );
    }else {
      setSelectItem([...selectItem, item]);
    }
  };
  const subtotal = selectItem.reduce((total, item) =>
    total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (!isSignedIn) {
      navigate(`/sign-in?redirect=/ProceedToCheckout`, {
        state: { items: selectItem }
      });
    } else {
      navigate(`/ProceedToCheckout`, {
        state: { items: selectItem }
      });
    }
  };

  return (
    <section className="bg-black pb-12 md:pb-18">
      <div className="container">
        <CheckoutNavbar />
        <div className="flex justify-between gap-7 md:gap-5 flex-col md:flex-row">
          <div className="w-full md:w-[63%]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#111] p-5 rounded-xl flex items-center gap-5"
              >
                 <input
                  type="checkbox"
                  checked={selectItem.some(
                    (selected) => selected.id === item.id
                  )}
                  onChange={() => handleSelect(item)}
                  className="accent-yellow-400 w-5 h-5"
                />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>

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
          <div className="bg-[#111] p-5 rounded-xl w-full md:w-[37%]">
            <h2 className="text-white text-3xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-12">
              <p className="text-white text-lg">Subtotal ({selectItem.length})</p>
              <p className="text-white text-base">{subtotal}</p>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <input type="text" className="py-2.5 px-3 w-[80%] text-black bg-white border-gray-400 border focus:outline-none" />
              <button className="py-2.5 px-7 rounded-sm bg-[#FFC200] text-white cursor-pointer hover:bg-[#eebc27]">Apply</button>
            </div>
            <div className="flex items-center justify-between mb-12">
              <p className="text-white text-base">Total:</p>
              <p className="text-white text-base">{subtotal}</p>
            </div>
            <button onClick={handleCheckout} className="py-2.5 px-7 w-full rounded-sm bg-[#FFC200] text-white cursor-pointer hover:bg-[#eebc27]">PROCEED TO CHECKOUT ({selectItem.length})</button>
          </div>
        </div>
      </div>
    </section>
  );
}