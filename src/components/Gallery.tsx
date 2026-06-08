import { CirclePlay } from "lucide-react";
import titleImg from '/imgs/logo.png';
import video1 from '/imgs/galleryVideo-1.mp4';
import img1 from '/imgs/gallery-2.jpg';
import video2 from '/imgs/galleryVideo-3.mp4';
import img2 from '/imgs/gallery-4.jpg';
import video3 from '/imgs/galleryVideo-2.mp4';
import img3 from '/imgs/gallery-6.jpg';

const galleryImgs = [
    {
        isVideo: true,
        video: video1,
    },
    {
        img: img1,
    },
    {
        isVideo: true,
        video: video2,
    },
    {
        img: img2,
    },
    {
        isVideo: true,
        video: video3,
    },
    {
        img: img3,
    },
];

export default function Gallery () {

    return (
        <section className="py-12 md:py-18 bg-[#000000]" id="gallery">
            <div className="container">
                <div className="mb-16 max-w-[500px] text-center mx-auto">
                    <div className="flex items-center justify-center gap-1 md:gap-2.5 mb-8">
                        <div className="max-w-[34px] md:max-w-[76px]">
                            <img src={titleImg} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-[32px] md:text-5xl font-bold">Gallery</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {galleryImgs.map((item, index) => (
                        <div className="border-[#FFC200] border-[4px] rounded-4xl overflow-hidden w-full h-[300px] relative" key={index} 
                        >
                            {item.isVideo ? 
                            <div className="h-full w-full">
                                <video src={item.video} controls autoPlay loop muted className="h-full w-full object-cover" />
                                <button className="cursor-pointer absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-10 duration-300">
                                    <CirclePlay color="#fff" size={30} />
                                </button>
                            </div>
                            :
                                <img src={item.img} alt={`gallery-${index}`} className="w-full h-full" />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}