import { Coffee, Hamburger, Menu, Pizza, Popcorn, Salad } from "lucide-react";
import { useEffect, useState } from "react";
import titleImg from '/imgs/kitchen-logo.jpg';
import { Link } from "react-router-dom";

interface MenuItem {
    id: number;
    cat: string[]; 
    price: number;
    img: string;
    title: string;
    desc: string;
};

const CATEGORIES = [
    {name: 'All'},
    { name: 'Pizzas', icon: <Pizza /> },
    { name: 'Burgers', icon: <Hamburger /> },
    { name: 'Snacks', icon: <Popcorn/>},
    { name: 'Salads', icon: <Salad /> },
    { name: 'Drinks', icon: <Coffee /> }
];

export default function OurMenu () {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    useEffect (()=> {
        const menuData = async ()=> {
            const res = await fetch('/data/MenuData.json');
            const data = await res.json();
            setMenuItems(data);
        }
        menuData();
    }, []);

    const [activeCart, setActiveCat] = useState('All');
    const categoryItems = menuItems.filter(item => item.cat.includes(activeCart));
    const menuNavBtns = (isActive: boolean): React.CSSProperties => ({
        color: isActive ? '#fff' : '#000',
    });

    const [isMobile, setIsMobile] =useState(false);
    
    return (
        <section className="py-12 md:py-18 bg-[#0C0B0B]" id="menu">
            <div className="container">
                <div className="mb-16 max-w-[650px] text-center mx-auto">
                    <div className="flex items-center justify-center gap-2 md:gap-2.5 mb-8">
                        <div className="max-w-[34px] md:max-w-[76px]">
                            <img src={titleImg} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-[32px] md:text-5xl font-bold">Our Menu</h2>
                    </div>
                </div>
                <div className="">
                    {/* desktop */}
                    <div className="hidden lg:flex gap-3 items-center justify-center mb-18">
                        {CATEGORIES.map((cat, index) => (
                            <button onClick={()=> setActiveCat(cat.name)} style={menuNavBtns(activeCart === cat.name)} className={`py-2 font-bold cursor-pointer px-6 text-lg bg-[#FFC200] hover:bg-[#e4b005] rounded-full text-black ${index !=0 ? 'inline-flex justify-center items-center gap-2' : ''}`} key={index}>
                                <span className="">{cat.icon}</span>
                                <p className="">{cat.name}</p>
                            </button>
                        ))}
                    </div>
                    {/* mobile */}
                    <div className="lg:hidden relative">
                        <button className="text-black text-xl font-bold mb-5 inline-flex items-center gap-1.5 p-2 cursor-pointer bg-[#fff] hover:bg-[#e0dfdf] rounded-md" onClick={()=> setIsMobile(!isMobile)}><Menu />  Menu</button>
                        {isMobile && (
                            <div className="absolute top-16 left-0 flex flex-col bg-[#181817] z-10 rounded-lg p-5 gap-5 shadow w-[230px]">
                                {CATEGORIES.map((cat, index) => (
                                    <button onClick={()=> setActiveCat(cat.name)} style={menuNavBtns(activeCart === cat.name)} className={`py-2 font-bold cursor-pointer px-6 text-lg bg-[#FFC200] hover:bg-[#e4b005] rounded-full text-black ${index !=0 ? 'inline-flex justify-center items-center gap-2' : ''}`} key={index}>
                                        <span className="">{cat.icon}</span>
                                        <p className="">{cat.name}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryItems.map((item) => (
                            <div key={item.id} className="bg-[#000000] w-full h-auto rounded-xl flex flex-col justify-between">
                                <div className="md:h-[220px] !h-[300px]">
                                    <img src={item.img} alt="dish-img" className="rounded-t-xl w-full h-full object-cover" />
                                </div>
                                <div className="text-center p-5">
                                    <h3 className="text-white text-xl font-bold mb-3 capitalize">{item.title}</h3>
                                    <p className="text-[#6D6D6D] text-sm mb-4">{item.desc}</p>
                                    <div className="flex gap-3 items-center justify-between">
                                    {/* <a href="#order" className="bg-[#FFCC33] rounded-full py-[6px] px-4 text-white text-lg hover:bg-[#eebc27]">Order Now</a> */}
                                     <Link 
                                        to={`/checkout/${item.id}`} 
                                         state={{
                                            product: item
                                        }}
                                        className="bg-[#FFCC33] rounded-full py-[6px] px-4 text-white text-lg hover:bg-[#eebc27]"
                                    >
                                        Order Now
                                    </Link>
                                    <p className="text-[#FFD600] text-lg font-bold">${item.price}</p>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};