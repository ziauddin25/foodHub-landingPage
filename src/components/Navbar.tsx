
import { Menu, ShoppingCart, UserRound, X } from "lucide-react";
import { useState } from "react";
import navLogo from '/imgs/logo-nav.jpg';
import { useNavigate, useParams } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";

export default function Nabvar () {

    const [isMobile, setIsMobile] =useState(false);
    const { isSignedIn } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const {cartItems} = useCart();
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const handleAddToCart = () => {
        if (!isSignedIn) {
        navigate(`/sign-in?redirect=/cart/${id}`);
        } else {
        navigate(`/cart/${id}`);
        }
    };

    return (
        <div className="py-7 flex items-center justify-between">
            <a href="#" className="max-w-[100px]">
                <img src={navLogo} alt="logo" className="w-full h-full object-cover rounded-md" />
            </a>
            {/* desktop */}
            <nav className="hidden lg:block">
                <ul className="flex gap-8 items-center justify-end">
                    <li><a href="/" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Home</a></li>
                    {/* <li><a href="#about_us" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">About Us</a></li> */}
                    <li><a href="#chefs" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Chefs</a></li>
                    <li><a href="#menu" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Menu</a></li>
                    <li><a href="#gallery" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Gallery</a></li>
                    {/* <li><a href="#contact" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Contact</a></li> */}
                    <div className="flex items-center gap-4 text-white mt-1.5">
                        {isSignedIn ? (
                                <UserButton />
                            ):<a href="#user" className=""><UserRound /></a>
                        }
                        <span className='text-white'>|</span>
                        <div className="">
                            <button className="relative cursor-pointer top-1.5" onClick={handleAddToCart}>
                                <ShoppingCart size={30} color="white" />
                                <span className="absolute -top-2 -right-2 bg-[#FFC200] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            </button>
                        </div>
                    </div>
                </ul>
            </nav>

            {/* mobile */}
            <div className="lg:hidden flex gap-4 items-center justify-end relative">
                <div className="flex items-center gap-4 text-white">
                    {isSignedIn ? (
                        <UserButton />
                        ):<a href="#user" className=""><UserRound /></a>
                    }
                    {/* <span className='text-white'>|</span> */}
                    <div className="">
                        <button className="relative cursor-pointer top-1.5" onClick={handleAddToCart}>
                            <ShoppingCart size={26} color="white" />
                            <span className="absolute -top-2 -right-2 bg-[#FFC200] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        </button>
                    </div>
                </div>
                <button className="relative cursor-pointer" onClick={() => setIsMobile(!isMobile)} >{isMobile ? <X color="#fff"/> : <Menu color="#fff" />}</button> 
                {isMobile && (
                    <nav className="absolute top-9 right-0 bg-black p-4 rounded-lg w-[200px]">
                        <ul>
                            <li className="mb-4"><a href="#home" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Home</a></li>
                            {/* <li className="mb-4"><a href="#about_us" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">About Us</a></li> */}
                            <li className="mb-4"><a href="#chefs" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Chefs</a></li>
                            <li className="mb-4"><a href="#menu" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Menu</a></li>
                            <li className="mb-4"><a href="#gallery" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Gallery</a></li>
                            {/* <li className="mb-4"><a href="#contact" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Contact</a></li> */}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}