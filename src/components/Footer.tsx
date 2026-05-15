import { Dot } from "lucide-react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer () {
    return (
        <section className="bg-[#0C0B0B] py-16 md:py-16">
            <div className="container flex flex-col md:flex-row justify-between items-center gap-14">
                <div className="max-w-full md:max-w-[500px]">
                    <div className="max-w-[100px] mb-8">
                       <a href="/" className=""> <img src="src/assets/imgs/logo-nav.jpg" alt="logo" className="w-full h-full object-cover rounded-md" /></a>
                    </div>
                    <p className="text-lg font-normal text-white mb-12">Where flavor meets speed. Our fast food restaurant is dedicated to serving hot, delicious meals crafted for every craving. Quality food, friendly service, and unforgettable taste — all in one place.</p>
                    <div className="">
                        <h2 className="text-white text-2xl font-bold capitalize mb-6">follow us</h2>
                        <div className="flex items-center gap-3.5">
                            <a href="#social" className="text-3xl text-white hover:text-[#cbcbcb]"><FaFacebook /></a>
                            <a href="#social" className="text-3xl text-white hover:text-[#cbcbcb]"><AiFillTwitterCircle /></a>
                            <a href="#social" className="text-3xl text-white hover:text-[#cbcbcb]"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex gap-1 md:gap-3 text-white items-center">
                        <a href="#privacy_policy" className="text-lg capitalize hover:text-[#cbcbcb] hover:underline">privacy policy</a>
                        <Dot />
                        <a href="#terms_conditions" className="text-lg capitalize hover:text-[#cbcbcb] hover:underline">terms and conditions</a>
                    </div>
                    <p className="text-lg text-white ">©2026 <a href="/" className="hover:text-[#cbcbcb] hover:underline">FoodHub, Ltd</a>. All Rights Reserved.</p>
                </div>
            </div>
        </section>
    );
}