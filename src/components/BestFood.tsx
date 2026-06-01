import { CirclePause, CirclePlay } from "lucide-react";
import { useRef, useState } from "react";
import titleImg from '../assets/imgs/kitchen-logo.jpg';
import bestFoodVideo from '../assets/imgs/foodVideo.mp4';

function BestFood () {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false)

    const togglePlay = ()=> {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            } else {
            video.pause();
        }
    };

    return (
        <section className="bg-[#0C0B0B] py-12 md:py-18">
            <div className="container">
                <div className="mb-16 max-w-[700px] text-center mx-auto">
                    <div className="flex items-center justify-center gap-2 md:gap-2.5 mb-8">
                        <div className="hidden md:block max-w-[76px]">
                            <img src={titleImg} alt="logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-[#fff] text-[32px] md:text-5xl font-bold">Fuel Your Body, Fuel Your Mind.</h2>
                    </div>
                    <p className="text-[#6D6D6D] text-lg">Welcome to a taste of perfection. Gather around for hearty, expertly crafted dishes that blend comfort, tradition, and a touch of modern flair. We craft every plate to make your dining experience memorable</p>
                </div>
                 <div className="relative" 
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                 >
                    <video className="rounded-3xl" 
                        ref={videoRef}
                        src={bestFoodVideo}
                        controls muted autoPlay
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)} 
                    />
                   {(isHover || !isPlaying) &&  (
                     <button onClick={togglePlay} className="cursor-pointer absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 z-10 duration-300">
                        {isPlaying ? <CirclePause color="#fff" size={60} /> : <CirclePlay color="#fff" size={60} />}
                    </button>
                   )}
                </div>
            </div>
        </section>
    );
}

export default BestFood;