import { useParams, Link } from "react-router-dom";
import { dishData } from "../../SpecialDish"; 
import CartNavbar from '../components/CartNavbar'
import { Minus, Plus, Star } from "lucide-react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";

export default function CartPage() {
  const { id } = useParams();
  const selectedDish = dishData.find((dish) => dish.id === Number(id));

  if (!selectedDish) {
    return (
      <div className="text-white text-center py-20 bg-black h-screen">
        <h2>Dish not found!</h2>
        <Link to="/" className="text-[#FFCC33] underline">Go Back to Home</Link>
      </div>
    );
  };

  const [quantity, setQuantity] = useState(1);

  const increase = ()=> {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="bg-black pb-12 md:pb-18">
        <div className="container">
            <CartNavbar />
            <nav className="text-white mb-4">
              <ul className="flex items-center gap-2 md:gap-2">
                <li><a href="/" className="text-white text-xs md:text-lg hover:underline">Home</a></li>
                /
                <li><a href="/" className="text-white text-xs md:text-lg hover:underline">Special Dish</a></li>
                /
                <li className="text-[#6D6D6D] text-xs md:text-lg">{selectedDish.title}</li>
              </ul>
            </nav>
            <div className="bg-[#0C0B0B] w-full h-full rounded-xl overflow-hidden flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-[50%]">
                <div className="h-[280px] md:h-auto mb-2">
                  <img src={selectedDish.img} alt="dish-img" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex items-center gap-3 p-4">
                  {selectedDish.othersImg?.map((f) => (
                    <div className="max-w-[100px] cursor-pointer" key={f}>
                      <img src={f} alt={f} className="w-full h-full object-cover rounded-md" />
                    </div>
                  ))}
                </div>
                </div>
                <div className="p-5 max-w-full md:max-w-[50%]">
                  <h3 className="text-white text-xl md:text-3xl font-bold mb-3 capitalize">{selectedDish.title}</h3>
                  <div className="flex items-center gap-2.5 mb-4">
                    <Star color="#FFC200" />
                    <Star color="#FFC200" />
                    <Star color="#FFC200" />
                    <Star color="#FFC200" />
                    <FaRegStarHalfStroke size={24} color="#FFC200" />
                    <p className="text-[#6D6D6D] text-base">26 Reviews</p>
                  </div>
                  <p className="text-[#6D6D6D] text-xl mb-4">{selectedDish.desc}</p>
                  <p className="text-[#FFD600] text-lg font-bold">${selectedDish.price}</p>
                  <div className="mb-5">
                    <h3 className="text-lg text-white font-bold mb-4">Quantity</h3>
                    <div className="flex items-center gap-2 inline-flex bg-white rounded-lg">
                      <button onClick={decrease} className="p-2.5 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tl-md rounded-bl-md "><Minus /></button>
                      <p className="text-black text-base">{quantity}</p>
                      <button onClick={increase} className="p-2.5 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tr-md rounded-br-md "><Plus /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 max-w-full md:max-w-[80%]">
                    <a href="#add_tocart" className="w-full text-lg text-white py-3 text-center bg-[#FFC200] hover:bg-[#eebc27] rounded-md">Add to cart</a>
                    <a href="#buy_now" className="w-full text-lg text-black py-3 text-center bg-white hover:bg-[#d6d5d5] rounded-md">Buy now</a>
                  </div>
                </div>
            </div>
        </div>
    </section>
  );
}
