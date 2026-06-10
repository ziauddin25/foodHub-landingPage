import { useLocation } from "react-router-dom";
import CheckoutNavbar from '../../checkout/components/CheckoutNavbar';
import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import CartImg from '/imgs/cartImg.avif';
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
};

type UserInfo = {
    name: string,
    phone: string,
    address: string,
    paymentMethod: "cod" | "online" | "bkash";
};

export default function ProceedToCheckout() {
    const location = useLocation();
    const [promoCode] = useState('');
    // const [completedOrder, setCompletedOrder ] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>( location.state?.items || []);
    const [showModal, setShowModal] = useState(false);
    const [orderStatus, setOrderStatus] = useState(""); // success | failed
    const [userInfo, setUserInfo] = useState<UserInfo>(()=> {
        const saved = localStorage.getItem('userInfo');
        return saved ? JSON.parse(saved) : {
            name: '',
            phone: '',
            address: '',
            paymentMethod: '',
        };
    });
    const hasInfo = userInfo.name && userInfo.phone && userInfo.address && userInfo.paymentMethod;
    const [isEditing, setIsEditing] = useState(false);

    useEffect (()=> {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [userInfo]);

    const paymentLabelMap: Record<string, string> = {
        cod: "Cash on Delivery",
        online: "Credit Card",
        bkash: "Bkash Payment",
    };


    const handlePayment = async () => {
        try {

            const orderConfirmed = true; 

            if (orderConfirmed) {
                setOrderStatus("success");
            } else {
                setOrderStatus("failed");
            }

            setShowModal(true);
        } catch (error) {
            setOrderStatus("failed");
            setShowModal(true);
        }
    };

    const CONFIG = {
        vatRate:1,
        deleveryCharge: 0.49,
        freeDeleveryCharge: 100
    }

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1), 0
    );

    const totalItems = cartItems.length;

    const increase = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
            item.id === id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            )
        );
    };

    const decrease = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
            item.id === id
                ? {
                    ...item,
                    quantity: Math.max(1, (item.quantity || 1) - 1),
                }
                : item
            )
        );
    };

    let discountPercent = 0;
    if (promoCode === "SAVE10") discountPercent = 10;
    if (promoCode === "SAVE20") discountPercent = 20;
    const discountAmount = (subtotal * discountPercent) /100;

    const deliveryCharge = subtotal >= CONFIG.freeDeleveryCharge ? 0 : CONFIG.deleveryCharge;

    const taxableAmount = subtotal - discountAmount;
    const vatAmount = (taxableAmount * CONFIG.vatRate) / 100;

    const grandTotal = subtotal - discountAmount + deliveryCharge + vatAmount;

    const [orderNo] = useState(
        `FH-${Math.floor(100000 + Math.random() * 900000)}`
    );

    const [orderDate] = useState(
         new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
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
                {hasInfo && (
                    <div className="text-white space-y-2 bg-[#111] rounded-xl p-5 w-full md:w-[60%]">
                        <p><span className="text-[#6D6D6D]">Name:</span> {userInfo.name}</p>
                        <p><span className="text-[#6D6D6D]">Phone:</span> {userInfo.phone}</p>
                        <p><span className="text-[#6D6D6D]">Address:</span> {userInfo.address}</p>
                        <p><span className="text-[#6D6D6D]">Payment Method:</span> {paymentLabelMap[userInfo.paymentMethod] || 'No Selected Method'}</p>

                        <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="mt-3 text-lg text-[#FFC200] underline cursor-pointer"
                        >
                        Edit
                        </button>
                        {isEditing && (
                            <div className="fixed inset-0 z-50 flex justify-end bg-black/60">
                                <div className="w-full md:w-[420px] h-full bg-[#111] p-5 animate-slideIn overflow-y-auto">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-white text-xl font-bold">Edit Info</h2>
                                    <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-white cursor-pointer"
                                    >
                                    <X />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        <input
                                        className="w-full p-3 bg-white text-black rounded"
                                        value={userInfo.name}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, name: e.target.value })
                                        }
                                    />

                                    <input
                                        className="w-full p-3 bg-white text-black rounded"
                                        value={userInfo.phone}
                                        onChange={(e) =>
                                            setUserInfo({ ...userInfo, phone: e.target.value })
                                        }
                                    />

                                    <textarea
                                    className="w-full p-3 bg-white text-black rounded"
                                    value={userInfo.address}
                                    onChange={(e) =>
                                        setUserInfo({ ...userInfo, address: e.target.value })
                                    }
                                    />
                                    </div>
                                     <div className="">
                                        <h2 className="text-white text-xl font-bold mb-5">Payment Method</h2>
                                        <p className="text-[#6D6D6D] text-lg mb-8">Select the bank for payment of your item</p>
                                        <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                        userInfo.paymentMethod === 'cod' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                                        }`}
                                        >
                                            <span>Cash on Delivery</span>
                                            <input 
                                                type="radio"
                                                name="payment_method"
                                                value="cod" 
                                                checked = {userInfo.paymentMethod === 'cod'}
                                                onChange={(e)=> setUserInfo({...userInfo, paymentMethod: e.target.value as UserInfo['paymentMethod']})}
                                                className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                            />
                                        </label>
                                        <div className="">
                                            <label 
                                                onClick={() => setUserInfo({ ...userInfo, paymentMethod:('online')})}
                                                className={`flex gap-4 cursor-pointer justify-between items-center px-2 py-3.5  mb-5 rounded-md text-white border-2 transition-all ${
                                                userInfo.paymentMethod === 'online' ? 'border-[#FFC200] bg-[#1a1a1a]' : 'border-[#6D6D6D]'
                                                }`}
                                            >
                                            <span className="font-medium">Credit Card</span>
                                            <input 
                                                type="radio"
                                                name="payment_method"
                                                value="online" 
                                                checked={userInfo.paymentMethod === 'online'}
                                                onChange={(e) => setUserInfo({...userInfo, paymentMethod:e.target.value as UserInfo['paymentMethod']})}
                                                className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                            />  
                                            </label>
                                            {userInfo.paymentMethod === 'online' && (
                                                <div className="mb-5 bg-[#222] border-2 border-[#6D6D6D] text-white rounded-md p-4 w-full animate-fadeIn">
                                                    <h2 className="text-lg font-semibold mb-3">Card Information</h2>
                                                    <div className="space-y-3">
                                                        <div className="">
                                                            <label htmlFor="name" className="text-md">Name on Card</label>
                                                            <input placeholder="John Doe" type="text" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                        </div>
                                                        <div className="">
                                                            <label htmlFor="name" className="text-md">Card Number</label>
                                                            <input type="number" inputMode="numeric" maxLength={16}  placeholder="XXXX XXXX XXXX XXXX" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                        </div>
                                                        <div className="flex justify-between flex-col md:flex-row gap-4">
                                                            <div className="w-full">
                                                                <label htmlFor="name" className="text-md">Expire Date</label>
                                                                <input type='date' placeholder="MM/YY" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                            </div>
                                                            <div className="w-full">
                                                                <label htmlFor="name" className="text-md">CVV/CVC</label>
                                                                <input type='text' inputMode="numeric" placeholder="XYZ" maxLength={4} className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                            userInfo.paymentMethod === 'bkash' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                                        }`}
                                        >
                                        <span>Bkash Payment</span>
                                            <input 
                                                type="radio"
                                                name="payment_method"
                                                value="bkash" 
                                                checked = {userInfo.paymentMethod === 'bkash'}
                                                onChange={(e)=> setUserInfo({...userInfo, paymentMethod: e.target.value as UserInfo['paymentMethod']})}
                                                className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                            />
                                        </label>
                                    </div>

                                    <button
                                    onClick={() => setIsEditing(false)}
                                    className="w-full bg-[#FFC200] py-2 rounded text-black"
                                    >
                                    Save
                                    </button>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!hasInfo && (
                    <div className="bg-[#111] rounded-xl p-5 w-full md:w-[60%]">
                    <h2 className="text-white text-3xl font-bold mb-3.5">Check Out Your Items</h2>
                    <p className="text-[#6D6D6D] text-lg mb-6">For a better experience, check your item and choose your shiping before ordering </p>
                    <div className="">
                        <div className="flex flex-col md:flex-row gap-6 items-center mb-12">
                            <div className="flex gap-3 flex-col w-full">
                                <label htmlFor="name" className="text-white text-base">Name</label>
                                <input type="text" placeholder="Enter your name..." className="text-black p-3.5 md:p-3 bg-white focus:outline-none rounded-md" 
                                 value={userInfo.name}
                                 onChange={(e)=> {setUserInfo({...userInfo, name: e.target.value})}}
                                />
                            </div>
                            <div className="flex gap-3 flex-col w-full">
                                <label htmlFor="name" className="text-white text-base">Phone</label>
                                <input type="number" placeholder="Enter your phone..." className="text-black p-3.5 md:p-3 bg-white focus:outline-none rounded-md"
                                 value={userInfo.phone}
                                 onChange={(e)=> {setUserInfo({...userInfo, phone: e.target.value})}}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col w-full mb-12">
                            <label htmlFor="text" className="text-white text-base">Delivery Address</label>
                            <textarea name="text" id="" placeholder="" className="text-black p-3 bg-white focus:outline-none rounded-md min-h-[130px]" 
                            value={userInfo.address}
                            onChange={(e)=> {setUserInfo({...userInfo, address: e.target.value})}}
                            ></textarea>
                        </div>
                        <div className="">
                            <h2 className="text-white text-xl font-bold mb-5">Payment Method</h2>
                            <p className="text-[#6D6D6D] text-lg mb-8">Select the bank for payment of your item</p>
                            <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                               userInfo.paymentMethod === 'cod' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                            }`}
                            >
                                <span>Cash on Delivery</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="cod" 
                                    checked = {userInfo.paymentMethod === 'cod'}
                                    onChange={(e)=> setUserInfo({...userInfo, paymentMethod: e.target.value as UserInfo['paymentMethod']})}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />
                            </label>
                            <div className="">
                                <label 
                                    onClick={() => setUserInfo({ ...userInfo, paymentMethod:('online')})}
                                    className={`flex gap-4 cursor-pointer justify-between items-center px-2 py-3.5  mb-5 rounded-md text-white border-2 transition-all ${
                                    userInfo.paymentMethod === 'online' ? 'border-[#FFC200] bg-[#1a1a1a]' : 'border-[#6D6D6D]'
                                    }`}
                                >
                                <span className="font-medium">Credit Card</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="online" 
                                    checked={userInfo.paymentMethod === 'online'}
                                    onChange={(e) => setUserInfo({...userInfo, paymentMethod:e.target.value as UserInfo['paymentMethod']})}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />  
                                </label>
                                {userInfo.paymentMethod === 'online' && (
                                    <div className="mb-5 bg-[#222] border-2 border-[#6D6D6D] text-white rounded-md p-4 w-full animate-fadeIn">
                                        <h2 className="text-lg font-semibold mb-3">Card Information</h2>
                                        <div className="space-y-3">
                                            <div className="">
                                                <label htmlFor="name" className="text-md">Name on Card</label>
                                                <input placeholder="John Doe" type="text" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                            </div>
                                            <div className="">
                                                <label htmlFor="name" className="text-md">Card Number</label>
                                                <input type="number" inputMode="numeric" maxLength={16}  placeholder="XXXX XXXX XXXX XXXX" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                            </div>
                                            <div className="flex justify-between flex-col md:flex-row gap-4">
                                                <div className="w-full">
                                                    <label htmlFor="name" className="text-md">Expire Date</label>
                                                    <input type='date' placeholder="MM/YY" className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                </div>
                                                <div className="w-full">
                                                    <label htmlFor="name" className="text-md">CVV/CVC</label>
                                                    <input type='text' inputMode="numeric" placeholder="XYZ" maxLength={4} className="w-full p-2 mt-2 bg-transparent border border-[#6D6D6D] rounded text-sm focus:outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                             <label className={`flex gap-4 cursor-pointer justify-between itmes-center px-2 py-3.5 mb-5 rounded-md text-white border border-[2px] ${
                                userInfo.paymentMethod === 'bkash' ? ' border-[#FFC200]' :' border-[#6D6D6D] '
                            }`}
                            >
                                <span>Bkash Payment</span>
                                <input 
                                    type="radio"
                                    name="payment_method"
                                    value="bkash" 
                                    checked = {userInfo.paymentMethod === 'bkash'}
                                    onChange={(e)=> setUserInfo({...userInfo, paymentMethod: e.target.value as UserInfo['paymentMethod']})}
                                    className="accent-yellow-400 w-5 h-5 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                )}
                <div className="w-full md:w-[40%] bg-[#111] h-auto p-5 rounded-xl">
                    <div className="mb-8">
                        <h2 className="text-white text-3xl font-bold mb-3.5">Current Order</h2>
                        <p className="text-[#6D6D6D] text-lg mb-6">The sum of all total payments for goods there</p>
                    </div>
                    <div className="">
                        {cartItems.map((item:CartItem) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-5 mb-7"
                        >
                            <img
                            src={item.image}
                            alt={item.title}
                            className="w-32 h-34 object-cover rounded-md"
                            />

                            <div className="w-full">
                            <h2 className="text-xl font-bold text-white">{item.title}</h2>

                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-400">
                                    Quantity: {item.quantity}
                                </p>
                                <p className="text-[#FFC200] text-lg">
                                    ${item.price * (Number(item.quantity))}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 inline-flex bg-white rounded-lg">
                                <button onClick={()=> decrease(item.id)} className="p-2 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tl-md rounded-bl-md "><Minus /></button>
                                <p className="text-black text-base">{item.quantity || 1}</p>
                                <button onClick={()=> increase(item.id)} className="p-2 cursor-pointer hover:bg-[#d6d5d5] transition durition-300 ease text-[#302D2D] text-base bg-white rounded-tr-md rounded-br-md "><Plus /></button>
                            </div>
                            </div>
                        </div>
                    ))}
                    </div>
                     <div className="flex items-center gap-3 mb-4">
                        <input type="text" className="py-2.5 px-3 w-[80%] text-black bg-white border-gray-400 border focus:outline-none" 
                         
                        />
                        <button className="py-[10.7px] px-7 rounded-sm bg-[#FFC200] text-white cursor-pointer hover:bg-[#eebc27]">Apply</button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-5 mb-5 border-[#FFC200]">
                        <h3 className="text-white text-xl font-bold">Subtotal</h3>
                        <p className="text-[#FFC200] text-xl">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Items</h3>
                        <p className="text-[#FFC200] text-base">{totalItems}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Code Promo</h3>
                        <p className="text-[#FFC200] text-base">${discountAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Delivery Service</h3>
                        <p className="text-[#FFC200] text-base">${deliveryCharge.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#6D6D6D] text-base">Vat</h3>
                        <p className="text-[#FFC200] text-base">${vatAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between border-b pb-5 mb-8 border-[#FFC200]">
                        <h3 className="text-[#6D6D6D] text-base">Total</h3>
                        <p className="text-[#FFC200] text-base">${grandTotal.toFixed(2)}</p>
                    </div>
                    <button onClick={handlePayment} className="bg-[#FFC200] cursor-pointer text-lg text-white w-full py-2.5 rounded-lg">Pay${grandTotal.toFixed(2)}</button>
                    {showModal && (
                    <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50 overflow-hidden">
                        <div className="bg-[#FFC200] overflow-hidden rounded-lg p-6 w-[90%] max-w-md text-center relative">
                            
                            {orderStatus === "success" ? (
                                <>
                                    <div className="max-w-[160px] m-auto mb-6">
                                        <img src={CartImg} alt="confirm_img" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Order Confirmed
                                    </h2>
                                    <p className="text-[#6D6D6D] text-base mb-7">Your order has been placed successfully.</p>
                                    <div className="text-start border border-2 border-[#6D6D6D] p-4 rounded-md">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-md text-white">Order No</h3>
                                            <p className="text-[#6D6D6D] text-md">{orderNo}</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-md text-white">Total</h3>
                                            <p className="text-[#6D6D6D] text-md">${grandTotal.toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-md text-white">Placed on</h3>
                                            <p className="text-[#6D6D6D] text-md">{orderDate}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-red-600 mb-3">
                                        ❌ Order Failed
                                    </h2>
                                    <p>Something went wrong. Please try again.</p>
                                </>
                            )}

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 bg-[#868080] hover:bg-[#686565] transition text-white h-[30px] w-[30px] flex justify-center items-center rounded-full cursor-pointer"
                            >
                                <X size={18}/>
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
    );
};