import { useLocation } from "react-router-dom";
import CheckoutNavbar from '../../checkout/components/CheckoutNavbar';
import { useState } from "react";
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
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const subtotal = selectedItems.reduce((total:number, item:CartItem) =>
        total + item.price * (item.quantity || 1),
        0
    );

    const discount = 2;
    const promo = subtotal * discount / 100;
    const finalDiscount = subtotal - promo;  

    const totalQuantity = selectedItems.reduce(
        (total: number, item: CartItem) =>
            total + (item.quantity || 1),
        0
    );
    
    return (
        <div className="pb-12 md:pb-18 bg-black">
            <div className="container">
            <CheckoutNavbar />
            <nav className="text-white mb-4">
              <ul className="flex items-center gap-2 md:gap-2">
                <li><a href="/" className="text-white text-xs md:text-lg hover:underline">Home</a></li>
                /
                <li className="text-[#6D6D6D] text-xs md:text-lg">Product Checkout</li>
                {/* <li className="text-[#6D6D6D] text-xs md:text-lg">{selectedDish.title}</li> */}
              </ul>
            </nav>
            <div className="flex justify-between items-start gap-7 md:gap-5 flex-col md:flex-row"> 
                <div className="bg-[#111] rounded-xl p-5 w-full md:w-[60%]">
                    <h2 className="text-white text-3xl font-bold mb-3.5">Check Out Your Items</h2>
                    <p className="text-[#6D6D6D] text-lg mb-6">For a better experience, check your item and choose your shiping before ordering </p>
                    <div className="">
                        <div className="flex gap-6 items-center mb-12">
                            <div className="flex gap-3 flex-col w-full">
                                <label htmlFor="name" className="text-white text-base">Name</label>
                                <input type="text" placeholder="Enter your name..." className="text-black p-3 bg-white focus:outline-none rounded-md" />
                            </div>
                            <div className="flex gap-3 flex-col w-full">
                                <label htmlFor="name" className="text-white text-base">Phone</label>
                                <input type="number" placeholder="Enter your phone..." className="text-black p-3 bg-white focus:outline-none rounded-md" />
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col w-full mb-12">
                            <label htmlFor="text" className="text-white text-base">Delivery Address</label>
                            <textarea name="text" id="" placeholder="" className="text-black p-3 bg-white focus:outline-none rounded-md min-h-[130px]"></textarea>
                        </div>
                        <div className="">
                            <h2 className="text-white text-xl font-bold mb-5">Payment Method</h2>
                            <p className="text-[#6D6D6D] text-lg mb-8">Select the bank for payment of your item</p>
                            <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                paymentMethod === 'cod' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                            }`}
                            >
                                <span>Cash on Delivery</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="cod" 
                                    checked = {paymentMethod === 'cod'}
                                    onChange={(e)=> setPaymentMethod(e.target.value)}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />
                            </label>
                            <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                paymentMethod === 'online' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                            }`}
                            >
                                <span>Online Payment(Cridit Card/Debit Card)</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="online" 
                                    checked = {paymentMethod === 'online'}
                                    onChange={(e)=> setPaymentMethod(e.target.value)}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />
                            </label>
                             <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                paymentMethod === 'bkash' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                            }`}
                            >
                                <span>Bkash Payment</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="bkash" 
                                    checked = {paymentMethod === 'bkash'}
                                    onChange={(e)=> setPaymentMethod(e.target.value)}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[40%] bg-[#111] h-auto p-5 rounded-xl">
                    <div className="mb-8">
                        <h2 className="text-white text-3xl font-bold mb-3.5">Current Order</h2>
                        <p className="text-[#6D6D6D] text-lg mb-6">The sum of all total payments for goods there</p>
                    </div>
                    <div className="">
                        {selectedItems.map((item:CartItem) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-5 mb-7"
                        >
                            <img
                            src={item.image}
                            alt={item.title}
                            className="w-28 h-28 object-cover rounded-lg"
                            />

                            <div>
                            <h2 className="text-xl font-bold text-white">{item.title}</h2>

                            <p className="text-[#FFC200] text-lg">
                                ${item.price}
                            </p>

                            <p className="text-gray-400">
                                Quantity: {item.quantity}
                            </p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="flex items-center justify-between border-b pb-5 mb-5 border-[#FFC200] ">
                        <h3 className="text-white text-xl font-bold">Subtotal</h3>
                        <p className="text-[#FFC200] text-xl">${subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Items</h3>
                        <p className="text-[#FFC200] text-base">{totalQuantity}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Code Promo</h3>
                        <p className="text-[#FFC200] text-base">${subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Delivery Service</h3>
                        <p className="text-[#FFC200] text-base">${subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Vat(0%)</h3>
                        <p className="text-[#FFC200] text-base">${0}</p>
                    </div>
                    <button className=""></button>
                </div>
            </div>
            </div>
        </div>
    );
};