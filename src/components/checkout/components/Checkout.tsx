import { useParams, Link } from "react-router-dom";
import { dishData } from "../../SpecialDish"; 
import CheckoutNavbar from '../components/CheckoutNavbar'
import { Check, Minus, Plus, Star } from "lucide-react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";
// import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";


export default function CartPage() {
  const { id } = useParams();
  const selectedDish = dishData.find((dish) => dish.id === Number(id));
  const [isBadge, setIsBadge] = useState(false);

  if (!selectedDish) {
    return (
      <div className="text-white text-center py-20 bg-black h-screen">
        <h2>Dish not found!</h2>
        <Link to="/" className="text-[#FFCC33] underline">Go Back to Home</Link>
      </div>
    );
  };

  const [isActiveImg, setIsActiveImg ] = useState(selectedDish.img);

  const [quantity, setQuantity] = useState(1);

  const increase = ()=> {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //  cart redirct

  // const {isSignedIn} = useUser();
  const navigate = useNavigate();

  // const handleBuyNow = () => {
  //   if (!isSignedIn) {
  //     navigate(`/sign-in?redirect=/checkout/${id}`);
  //   } else {
  //     navigate(`/checkout/${id}`);
  //   }
  // };

  const handleBuy = () => {
  const product = {
    id: selectedDish.id,
    title: selectedDish.title,
    price: Number(selectedDish.price),
    image: selectedDish.img,
    quantity,
  };

  navigate("/ProceedToCheckout", {
    state: {
      items: [product],
    },
  });
};

    const { addToCart } = useCart();
    const handleAddToCart = () => {
      addToCart({
        id: selectedDish.id,
        title: selectedDish.title,
        price: Number(selectedDish.price),
        // totalPrice: totalPrice,
        image: selectedDish.img,
        quantity: quantity,
      });

      setIsBadge(true);

      setTimeout(() => {
        setIsBadge(false)
      }, 2000);
    };

    // navigate(`/cart/${id}`);
    // };

    

  return (
    <section className="bg-black pb-12 md:pb-18 relative">
        <div className="container">
            <CheckoutNavbar />
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
                  <div className="h-[280px] md:h-[400px] mb-2">
                    <img
                      src={isActiveImg}
                      alt="dish-img"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <div onClick={() => setIsActiveImg(selectedDish.img)} className={`h-[80px] md:h-[94px] w-full cursor-pointer border-2 rounded-md overflow-hidden ${
                        isActiveImg === selectedDish.img
                          ? "border-yellow-400"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={selectedDish.img}
                        alt="main"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedDish.othersImg?.map((img) => (
                      <div key={img} onClick={() => setIsActiveImg(img)} className={`h-[80px] md:h-[94px] w-full cursor-pointer border-2 rounded-md overflow-hidden ${
                          isActiveImg === img
                            ? "border-yellow-400"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              {/* <div className="w-full md:w-[50%]"> */}
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
                  <p className="text-[#FFD600] text-lg font-bold">${(Number(selectedDish.price)) * quantity}</p>
                  <div className="mb-5">
                    <h3 className="text-lg text-white font-bold mb-4">Quantity</h3>
                    <div className="flex items-center gap-2 inline-flex bg-white rounded-lg">
                      <button onClick={decrease} className="p-2.5 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tl-md rounded-bl-md "><Minus /></button>
                      <p className="text-black text-base">{quantity}</p>
                      <button onClick={increase} className="p-2.5 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tr-md rounded-br-md "><Plus /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 max-w-full md:max-w-[80%]">
                    <button onClick={handleAddToCart} className="w-full text-lg cursor-pointer text-white py-3 text-center bg-[#FFC200] hover:bg-[#eebc27] rounded-md">Add to cart</button>
                    <button onClick={handleBuy} className="w-full text-lg cursor-pointer text-black py-3 text-center bg-white hover:bg-[#d6d5d5] rounded-md">Buy now</button>
                  </div>
                  {isBadge && (
                     <div className="flex py-3 px-5 gap-1.5 items-center rounded-md bg-[#FFC200] fixed bottom-4 right-4">
                       <Check color="#fff"/> <p className="text-white text-lg">Add to cart</p>
                     </div>
                  )}
                </div>
            </div>
        </div>
    </section>
  );
}
 