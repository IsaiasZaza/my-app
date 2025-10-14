"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCalendarAlt, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const images = ["felipe.jpg", "/fez.jpg"];

export default function WeddingComponent() {
    return (
        <section className="relative overflow-hidden px-4 sm:px-8 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36 max-w-7xl mx-auto">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-amber-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-16 lg:space-y-0 lg:space-x-20">

                {/* Texto principal */}
                <motion.div
                    className="text-center lg:text-left lg:w-1/2 max-w-2xl space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Decorative element */}
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                        <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        <FaHeart className="mx-4 text-amber-500 animate-pulse" />
                        <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold gradient-text leading-tight">
                        Felipe & Mirian 
                    </h1>
                    
                    <div className="space-y-4">
                        <p className="uppercase tracking-[0.2em] text-lg sm:text-xl text-amber-700 font-medium">
                            Chá de Panela
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-amber-800">
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-elegant">
                                <FaCalendarAlt className="text-amber-600 text-xl" />
                                <span className="text-xl sm:text-2xl font-semibold"> - -</span>
                                <span className="text-lg font-medium">Às - -</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-elegant">
                            <FaMapMarkerAlt className="text-amber-600 text-xl" />
                            <span className="text-lg font-semibold text-amber-800">Não decidimos ainda :)</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-6 text-gray-700 text-lg leading-relaxed">
                        <motion.h2 
                            className="text-2xl sm:text-3xl font-serif font-semibold text-amber-800"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Bem-vindos ao nosso chá de panela!
                        </motion.h2>
                        
                        <motion.div 
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <p className="text-lg leading-relaxed">Sim, é verdade! Vamos celebrar juntos esse momento especial!</p>
                            <p className="text-lg leading-relaxed">Gostaríamos muito de contar com a sua presença e, se desejar, com um presente especial para nos ajudar a começar essa nova fase juntos.</p>
                            <p className="text-lg leading-relaxed font-medium text-amber-800">Com carinho, Felipe & Mirian. Nos vemos em breve!</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Carrossel de imagens */}
                <motion.div
                    className="lg:w-1/2 w-full flex justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative w-full sm:w-4/5 lg:w-full">
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{ 
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet swiper-pagination-bullet-custom',
                                bulletActiveClass: 'swiper-pagination-bullet-active swiper-pagination-bullet-active-custom'
                            }}
                            modules={[Autoplay, Pagination]}
                            className="w-full rounded-3xl overflow-hidden shadow-elegant-lg"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative overflow-hidden rounded-3xl">
                                        <img
                                            src={image}
                                            alt={`Imagem ${index + 1} do Chá de Panela de João e Larissa`}
                                            className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
