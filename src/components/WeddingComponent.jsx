"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const images = ["/cs.jpg", "/cs2.jpg"];

export default function WeddingComponent() {
    return (
        <section className="font-poppins px-4 sm:px-8 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-12 lg:space-y-0 lg:space-x-16">

                {/* Texto principal */}
                <motion.div
                    className="text-center lg:text-left lg:w-1/2 max-w-2xl space-y-6 md:space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#A66A42] font-bold drop-shadow-md mt-8">Larissa & João</h1>
                    <p className="uppercase tracking-wide text-lg sm:text-xl text-[#A66A42] font-medium">Chá de Panela</p>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#A66A42] flex items-center justify-center lg:justify-start gap-3">
                        <FaCalendarAlt className="text-[#A66A42]" />
                        10/05
                        Às 16hr
                    </p>
                    <p className=" md:text-xl font-semibold text-[#A66A42] flex items-center justify-center lg:justify-start gap-3"><FaLocationDot /> Igreja Batista Ebenezer</p>

                    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-[#5E4736] text-base sm:text-lg md:text-xl leading-relaxed">
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#A66A42]">Bem-vindos ao nosso chá de panela!</h2>
                        <p>Sim, é verdade! Vamos celebrar juntos esse momento especial!</p>
                        <p>Gostaríamos muito de contar com a sua presença e, se desejar, com um presente especial para nos ajudar a começar essa nova fase juntos.</p>
                        <p>Com carinho, João & Larissa. Nos vemos em breve!</p>
                    </div>
                </motion.div>

                {/* Carrossel de imagens */}
                <motion.div
                    className="lg:w-1/2 w-full flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Pagination]}
                        className="w-full sm:w-3/4 lg:w-4/5"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Imagem ${index + 1} do Chá de Panela de João e Larissa`}
                                    className="rounded-2xl shadow-xl w-full h-60 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
}
