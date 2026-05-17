import { Search, ShoppingCart, UserRound } from 'lucide-react';
import logoImg from '../../../assets/imgs/logo-nav.jpg';
import { useUser } from "@clerk/clerk-react";
import { SignedIn} from "@clerk/clerk-react";
import { useCart } from "../../../context/CartContext";
import { Link } from 'react-router-dom';
export default function Navbar() {
   const { isSignedIn, user } = useUser();
    const {cartItems} = useCart();
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div className="">
            {/* desktop */}
            <div className="hidden md:flex justify-between items-center py-8">
                <div className="max-w-[100px]">
                    <a href="/" className=""> <img src={logoImg} alt="logo" className="w-full h-full object-cover rounded-md" /></a>
                </div>
                <div className="flex items-center text-white">
                    <div className="flex items-center bg-white px-4 rounded-tl-md rounded-bl-md">
                        <Search  color='#000'/>
                        <input className='py-3 px-2 focus:outline-none text-black' type="text" placeholder='Search....' />
                    </div>
                    <button className="py-3 px-4 bg-[#FFC200] text-white rounded-tr-md rounded-br-md cursor-pointer hover:bg-[#eebc27]">Search</button>
                </div>
                <div className="flex items-center gap-4 text-white">
                    {isSignedIn ? (
                        //  <SignedIn>
                        //     <UserMenu />
                        // </SignedIn>
                        <div className="max-w-[35px] cursor-pointer">
                            <img src={user.imageUrl} alt="user-img" className='rounded-full w-full h-full object cover' />
                        </div>
                        ):<a href="#user" className=""><UserRound /></a>
                    }
                    <span className='text-white'>|</span>
                     <Link to="/cart" className="relative">
                        <ShoppingCart size={35} color="white" />

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    </Link>
                </div>
            </div>
            {/* mobile */}
            <div className="block md:hidden py-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="max-w-[100px]">
                        <a href="/" className=""> <img src={logoImg} alt="logo" className="w-full h-full object-cover rounded-md" /></a>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                        {isSignedIn ? (
                        <div className="max-w-[35px] cursor-pointer">
                            <img src={user.imageUrl} alt="user-img" className='rounded-full w-full h-full object cover' />
                        </div>
                        ):<a href="#user" className=""><UserRound /></a>
                        }
                        <span className='text-white'>|</span>
                        <a href="#cart" className=""><ShoppingCart size={35} /></a>
                    </div>
                </div>
                <div className="flex items-center text-white">
                    <div className="flex items-center bg-white px-4 rounded-tl-md rounded-bl-md w-full">
                        <Search  color='#000'/>
                        <input className='py-3 px-2 w-full focus:outline-none text-black' type="text" placeholder='Search....' />
                    </div>
                    <button className="py-3 px-4 bg-[#FFC200] text-white rounded-tr-md rounded-br-md cursor-pointer hover:bg-[#eebc27]">Search</button>
                </div>
            </div>
        </div>
    );
};