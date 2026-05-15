import { ArrowLeft, ArrowRight } from "lucide-react";

const dishData = [
    {
        title: 'ceaser salad',
        desc: 'Fresh, crunchy, and perfectly crisp, tossed in rich, creamy Caesar flavor.',
        price: '10.00',
        img: 'src/assets/imgs/dish1.png'
    },
    {
        title: 'Classic Beef Burger',
        desc: 'Juicy beef patty with fresh lettuce, cheese, and signature sauce.',
        price: '24.00',
        img: 'src/assets/imgs/dish2.png'
    },
    {
        title: 'Pepperoni Pizza',
        desc: 'Loaded with spicy pepperoni and melted mozzarella cheese.',
        price: '20.00',
        img: 'src/assets/imgs/dish3.jpg'
    },
    {
        title: 'Chili Garlic Pasta',
        desc: 'Rich creamy sauce tossed with perfectly cooked pasta.',
        price: '16.00',
        img: 'src/assets/imgs/dish4.jpg'
    },
];

export default function SpecialDish () {
    return (
        <section className="bg-[#000] py-18">
            <div className="container">
                <div className="mb-16 max-w-[650px] text-center m-auto">
                    <div className="flex items-center gap-2.5 mb-8">
                        <div className="max-w-[76px]">
                            <img src="src/assets/imgs/logo.png" alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-5xl font-bold">Our Special Dishes</h2>
                    </div>
                    <p className="text-[#6D6D6D] text-lg">Discover the taste of perfection with our signature dishes, crafted from fresh ingredients and rich flavors. Every plate is designed to deliver a memorable dining experience that blends tradition with creativity.</p>
                </div>
                <div className="flex gap-6 mb-10 ">
                    {dishData.map((item, index) => (
                        <div className="bg-[#0C0B0B] w-full rounded-xl flex flex-col justify-between" key={index}>
                            <div className="">
                                <img src={item.img} alt="dish-img" className="rounded-t-xl" />
                            </div>
                            <div className="text-center p-5">
                                <h3 className="text-white text-xl font-bold mb-3 capitalize">{item.title}</h3>
                                <p className="text-[#6D6D6D] text-sm mb-2.5">{item.desc}</p>
                                <p className="text-[#FFD600] text-lg font-bold">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-3 items-center text-center justify-center">
                    <span className="text-[#8E9296] cursor-pointer"><ArrowLeft /></span>
                    <span className="text-[#8E9296] cursor-pointer"><ArrowRight /></span>
                </div>
            </div>
        </section>
    );
}