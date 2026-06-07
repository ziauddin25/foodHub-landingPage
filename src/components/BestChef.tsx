import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import titleImg from '/imgs/logo.png';
import chef1 from '/imgs/chef-1.jpg';
import chef2 from '/imgs/chef-2.jpg';
import chef3 from '/imgs/chef-3.jpg';
import chef4 from '/imgs/chef-4.jpg';

const chefData = [
    {
        title: 'Richard Nauz',
        img: chef1,
    },
    {
        title: 'Classic Beef Burger',
        img: chef2,
    },
    {
        title: 'Pepperoni Pizza',
        img:chef3,
    },
    {
        title: 'Chili Garlic Pasta',
        img: chef4
    },
];

export default function BestChef () {
    return (
        <section className="bg-[#000000] py-12 md:py-18" id="chefs">
            <div className="container">
                <div className="mb-16 max-w-[650px] text-center mx-auto">
                    <div className="flex items-center justify-center gap-2 md:gap-2.5 mb-8">
                        <div className="max-w-[34px] md:max-w-[76px]">
                            <img src={titleImg} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-[32px] md:text-5xl font-bold">Our best chef</h2>
                    </div>
                    <p className="text-[#6D6D6D] text-lg"> They are masters of efficiency, optimizing inventory to reduce food waste, managing food costs, and updating menus to drive business growth.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-5">
                    {chefData.map((item, index) => (
                        <div key={index} className="bg-[#0C0B0B] w-full h-auto rounded-xl flex flex-col justify-between">
                            <div className="chef-img md:h-[280px]">
                                <img src={item.img} alt="dish-img" className="rounded-t-xl w-full h-full " />
                            </div>
                            <div className="text-center p-5">
                                <h3 className="text-white text-xl font-bold mb-3 capitalize">{item.title}</h3>
                                <p className="text-[#6D6D6D] text-sm mb-4">Food Chef</p>
                                <div className="flex gap-3.5 items-center justify-center">
                                    <a href="#social_link" className="text-[#FFD600] text-lg font-bold"><FaFacebook /></a>
                                    <a href="#social_link" className="text-[#FFD600] text-lg font-bold"><FaTwitter /></a>
                                    <a href="#social_link" className="text-[#FFD600] text-lg font-bold"><FaInstagram/> </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};