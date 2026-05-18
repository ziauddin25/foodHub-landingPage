import { useLocation } from "react-router-dom";
import CheckoutNavbar from '../../checkout/components/CheckoutNavbar';
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
};
export default function ProceedToCheckout() {
    const location = useLocation();
    const selectedItems = location.state?.items || [];
    console.log(selectedItems);
    
    return (
        <div className="pb-12 md:pb-18 bg-black">
            <div className="container">
            <CheckoutNavbar />
            <nav className="text-white mb-4">
              <ul className="flex items-center gap-2 md:gap-2">
                <li><a href="/" className="text-white text-xs md:text-lg hover:underline">Home</a></li>
                /
                <li><a href="/" className="text-[#6D6D6D] text-xs md:text-lg">Product Checkout</a></li>
                {/* <li className="text-[#6D6D6D] text-xs md:text-lg">{selectedDish.title}</li> */}
              </ul>
            </nav>
            <div className="flex justify-between gap-7 md:gap-5 flex-col md:flex-row"> 
                <div className="">
                    <h2 className="">Check Out Your Items</h2>
                    <p className="">For a better experience, check your item and choose your shiping before ordering </p>
                    <div className="">
                        <div className="">
                            <label htmlFor="name" className="">Name</label>
                            <input type="text" placeholder="Enter your name..." className="" />
                        </div>
                        <div className="">
                            <label htmlFor="name" className="">Phone</label>
                            <input type="number" placeholder="Enter your phone..." className="" />
                        </div>
                        <div className="">
                            <label htmlFor="text" className="">Delivery Address</label>
                            <textarea name="text" id="" placeholder=""></textarea>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[40%]">
                {selectedItems.map((item:CartItem) => (
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
            </div>
            </div>
        </div>
    );
};