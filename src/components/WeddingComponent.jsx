"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaHeart, FaCalendarAlt, FaGift } from "react-icons/fa";
import "@fontsource/roboto"; // Fonte principal

const images = ["/Le.jpg", "/lele.jpg"];

export default function WeddingComponent() {
    return (
        <div className="font-roboto flex flex-col lg:flex-row items-center lg:items-start p-4 sm:p-8 lg:p-16 space-y-8 lg:space-y-0 lg:space-x-16 max-w-6xl mx-auto bg-gray-50 mt-4">
            {/* Texto principal */}
            <div className="text-center lg:text-left lg:w-1/2 space-y-6 sm:space-y-8">
                <h1 className="text-3xl sm:text-5xl text-green-700 font-bold flex items-center justify-center lg:justify-start space-x-2">
                    <span>Junio & Leticia</span>
                </h1>
                <p className="uppercase tracking-wide text-lg text-green-900 flex items-center justify-center lg:justify-start space-x-2">
                    <span>Chá de Panela</span>
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-green-900 flex items-center justify-center lg:justify-start space-x-2">
                    <FaCalendarAlt className="text-green-600" />
                    <span>09 Novembro 2024</span>
                </p>
                <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-6 text-green-900">
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

            {/* Carrossel de imagens */}
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
