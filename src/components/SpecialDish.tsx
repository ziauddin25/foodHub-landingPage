import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import titleImg from '../assets/imgs/logo.png';

// Import Swiper styles
import 'swiper/css';
import { Navigation } from "swiper/modules";
import 'swiper/css/navigation';
import '../index.css'
import { useRef } from "react";
import { Link } from "react-router-dom";
import dish1 from '../assets/imgs/dish1.png'
import dish2 from '../assets/imgs/dish2.png'
import dish3 from '../assets/imgs/dish3.jpg'
import dish4 from '../assets/imgs/dish4.jpg'
import dish5 from '../assets/imgs/dish5.webp'
import dish6 from '../assets/imgs/dish6.jpg'
/* others imgs */
// salad
import salad1 from '../assets/imgs/others_imgs/salad1.jpg';
import salad2 from '../assets/imgs/others_imgs/salad2.jpg';
import salad3 from '../assets/imgs/others_imgs/salad3.jpg';
//burger
import burger1 from '../assets/imgs/burgers.jpg';
import burger2 from '../assets/imgs/others_imgs/burger2.jpg';
import burger3 from '../assets/imgs/others_imgs/burger3.jpg';
//pizza
import pizza1 from '../assets/imgs/menuPizza.jpg';
import pizza2 from '../assets/imgs/others_imgs/pizza2.jpg';
import pizza3 from '../assets/imgs/others_imgs/pizza3.jpg';
//pizza
import pasta1 from '../assets/imgs/others_imgs/pasta1.jpg';
import pasta2 from '../assets/imgs/others_imgs/pasta2.jpg';
import pasta3 from '../assets/imgs/others_imgs/pasta3.jpg';
//pizza
import coffee1 from '../assets/imgs/others_imgs/coffee1.jpg';
import coffee2 from '../assets/imgs/others_imgs/coffee2.jpg';
import coffee3 from '../assets/imgs/others_imgs/coffee3.jpg';
//pizza
import kabab1 from '../assets/imgs/others_imgs/kabab1.jpg';
import kabab2 from '../assets/imgs/others_imgs/kabab2.jpg';
import kabab3 from '../assets/imgs/others_imgs/kabab3.jpg';


export const dishData = [
    {
        id: 1,
        title: 'ceaser salad',
        desc: 'Fresh, crunchy, and perfectly crisp, tossed in rich, creamy Caesar flavor.',
        price: '8.00',
        img: dish1,
        othersImg: [salad1, salad2, salad3]
    },
    {
        id: 2,
        title: 'Classic Beef Burger',
        desc: 'Juicy beef patty with fresh lettuce, cheese, and signature sauce.',
        price: '8.00',
        img: dish2,
        othersImg: [burger1, burger2, burger3]
    },
    {
        id: 3,
        title: 'Pepperoni Pizza',
        desc: 'Loaded with spicy pepperoni and melted mozzarella cheese.',
        price: '12.00',
        img: dish3,
        othersImg: [pizza1, pizza2, pizza3]
    },
    {
        id: 4,
        title: 'Chili Garlic Pasta',
        desc: 'Rich creamy sauce tossed with perfectly cooked pasta.',
        price: '10.00',
        img: dish4,
        othersImg: [pasta1, pasta2, pasta3]
    },
    {
        id: 5,
        title: 'Cappuccino Bliss',
        desc: 'A rich and creamy cappuccino with smooth espresso and frothy milk foam.',
        price: '6.00',
        img: dish5,
        othersImg: [coffee1, coffee2, coffee3]
    },
    {
        id: 6,
        title: 'Beef Shami Kabab',
        desc: 'Soft beef kabab mixed with spices and lentils, lightly fried for a crispy texture.',
        price: '16.00',
        img: dish6,
        othersImg: [kabab1, kabab2, kabab3]
    },
];

export default function SpecialDish () {
    const swiperRef = useRef<any>(null);

    return (
        <section id="dish_section" className="bg-[#000] py-12 md:py-18">
            <div className="container">
                <div className="mb-16 max-w-[650px] text-center mx-auto">
                    <div className="flex items-center justify-center gap-1 md:gap-2.5 mb-8">
                        <div className="max-w-[34px] md:max-w-[76px]">
                            <img src={titleImg} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-[32px] md:text-5xl font-bold">Our Special Dishes</h2>
                    </div>
                    <p className="text-[#6D6D6D] text-lg">Discover the taste of perfection with our signature dishes, crafted from fresh ingredients and rich flavors. Every plate is designed to deliver a memorable dining experience that blends tradition with creativity.</p>
                </div>
                <Swiper className="mb-7"
                    loop={true}
                    spaceBetween={20}
                    // slidesPerView={4}
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    navigation={{
                        prevEl: '.custom-prev',
                        nextEl: '.custom-next',
                    }}
                    breakpoints={{
                        320: {
                        slidesPerView: 1,
                        },
                        640: {
                        slidesPerView: 2,
                        },
                        768: {
                        slidesPerView: 2,
                        },
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                >
                {dishData.map((item) => (
                    <SwiperSlide key={item.id} className="!h-auto">
                        <div className="bg-[#0C0B0B] w-full h-full rounded-xl flex flex-col justify-between">
                            <div className="min-h-[300px] !md:h-[280px]">
                                <img src={item.img} alt="dish-img" className="rounded-t-xl w-full h-full object-cover" />
                            </div>
                            <div className="text-center p-5">
                                <h3 className="text-white text-xl font-bold mb-3 capitalize">{item.title}</h3>
                                <p className="text-[#6D6D6D] text-sm mb-4">{item.desc}</p>
                                <div className="flex gap-3 items-center justify-between">
                                    {/* <a href="#order" className="bg-[#FFCC33] rounded-full py-[6px] px-4 text-white text-lg hover:bg-[#eebc27]">Order Now</a> */}
                                     <Link 
                                        to={`/checkout/${item.id}`} 
                                        className="bg-[#FFCC33] rounded-full py-[6px] px-4 text-white text-lg hover:bg-[#eebc27]"
                                    >
                                        Order Now
                                    </Link>
                                    <p className="text-[#FFD600] text-lg font-bold">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
                <div className="flex gap-3 items-center text-center justify-center">
                    <span className="custom-prev text-[#8E9296] cursor-pointer hover:text-[#717172]"onClick={() => swiperRef.current?.slidePrev(1000)}><ArrowLeft /></span>
                    <span className="custom-next text-[#8E9296] cursor-pointer hover:text-[#717172]" onClick={() => swiperRef.current?.slideNext(1000)}><ArrowRight /></span>
                </div>
            </div>
        </section>
    );
}