import Nabvar from "./Navbar";

export default function Hero () {
    return (
        <section className="hero-bg">
            <div className="container">
                <Nabvar />
                <div className="py-25 max-w-full md:max-w-[600px]">
                    <h2 className="text-white text-[42px] md:text-[64px] font-bold mb-4">Best quality food</h2>
                    <p className="text-[#7B7575] text-lg mb-8">Experience elevated dining at Food Hub, where traditional techniques meet modern innovation. Featuring seasonal ingredients crafted into exquisite dishes by our acclaimed chef. Join us for an unforgettable evening of culinary excellence, exceptional wine, and unparalleled service.</p>
                    <a href="src/components/test/test" className="bg-[#FFCC33] capitalize btn-hero px-6 py-3.5 rounded-full shadow font-bold text-white inline-block hover:bg-[#eebc27]">book a table</a>
                </div>
            </div>
        </section>
    );
}