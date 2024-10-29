"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Importa a fonte do Google Fonts
import "@fontsource/roboto"; // ou "@fontsource/lora" / "@fontsource/merriweather" se preferir outra opção

const images = [
    "/Le.jpg",
    "/lele.jpg",
];

export default function WeddingComponent() {
    return (
        <div className="font-roboto flex flex-col lg:flex-row items-center lg:items-start p-4 sm:p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-16 max-w-5xl mx-auto">
            <div className="text-center lg:text-left lg:w-1/2 space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-green-900 font-bold">Junio & Leticia</h1>
                <p className="uppercase tracking-wider text-base sm:text-lg text-green-900">Chá de Panela</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-green-900">09 Novembro 2024</p>
                <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-5 text-green-900">
                    <h2 className="text-lg sm:text-2xl font-semibold">Bem-vindos ao nosso chá de panela!</h2>
                    <p className="text-sm sm:text-lg">
                        Sim, é verdade! Vamos celebrar juntos o nosso chá de panela!!
                    </p>
                    <p className="text-sm sm:text-lg">
                        Gostaríamos muito de contar com a sua presença e, se desejar, com um presente especial para nos ajudar a começar essa nova fase juntos.
                    </p>
                    <p className="text-sm sm:text-lg">
                        Aproveite da web e a gente se encontra em breve, muitos beijos!
                    </p>
                </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    className="w-full sm:w-3/4 lg:w-4/5"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Foto ${index + 1} de Leticia e Junio`}
                                className="rounded-lg shadow-lg w-full h-64 sm:h-80 md:h-[500px] object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
