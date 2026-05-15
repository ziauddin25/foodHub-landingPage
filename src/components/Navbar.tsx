
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nabvar () {

    const [isMobile, setIsMobile] =useState(false);

    return (
        <div className="py-7 flex items-center justify-between">
            <a href="#" className="max-w-[100px]">
                <img src="src/assets/imgs/logo-nav.jpg" alt="logo" className="w-full h-full object-cover rounded-md" />
            </a>
            {/* desktop */}
            <nav className="hidden lg:block">
                <ul className="flex gap-8 items-center justify-end">
                    <li><a href="#home" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Home</a></li>
                    <li><a href="#about_us" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">About Us</a></li>
                    <li><a href="#chefs" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Chefs</a></li>
                    <li><a href="#menu" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Menu</a></li>
                    <li><a href="#gallery" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Gallery</a></li>
                    <li><a href="#contact" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Contact</a></li>
                </ul>
            </nav>

            {/* mobile */}
            <div className="lg:hidden flex justify-end relative">
                <button className="relative cursor-pointer" onClick={() => setIsMobile(!isMobile)} >{isMobile ? <X color="#fff"/> : <Menu color="#fff" />}</button> 
                {isMobile && (
                    <nav className="absolute top-9 right-0 bg-black p-4 rounded-lg w-[200px]">
                        <ul>
                            <li className="mb-4"><a href="#home" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Home</a></li>
                            <li className="mb-4"><a href="#about_us" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">About Us</a></li>
                            <li className="mb-4"><a href="#chefs" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Chefs</a></li>
                            <li className="mb-4"><a href="#menu" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Menu</a></li>
                            <li className="mb-4"><a href="#gallery" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Gallery</a></li>
                            <li className="mb-4"><a href="#contact" className="text-2xl text-white font-normal hover:text-[#acabab] hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}