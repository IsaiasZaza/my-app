import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaMoon, FaGift } from "react-icons/fa";

export default function HoneymoonDonation() {
    return (
        <section className="relative py-20 md:py-28 lg:py-36 px-6 sm:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-center overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-amber-200/40 to-orange-300/40 rounded-full blur-2xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-200/20 to-amber-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
            </div>

            {/* Decorative wave */}
            <div className="absolute top-0 left-0 w-full h-32 -z-5">
                <svg viewBox="0 0 1440 120" className="w-full h-full text-amber-100">
                    <path fill="currentColor" fillOpacity="0.3" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64V120H1360C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120H0Z"></path>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header with decorative elements */}
                <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        <FaMoon className="mx-6 text-amber-500 text-2xl animate-pulse" />
                        <FaHeart className="mx-2 text-rose-500 text-xl animate-pulse" style={{animationDelay: '0.5s'}} />
                        <FaMoon className="mx-6 text-amber-500 text-2xl animate-pulse" style={{animationDelay: '1s'}} />
                        <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold gradient-text mb-6">
                        Ajude-nos a realizar nossa Lua de Mel!
                    </h2>
                    
                    <p className="text-gray-700 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
                        Sua generosidade tornará nosso sonho ainda mais especial. <br />
                        Qualquer contribuição será recebida com muito carinho e gratidão! 💕
                    </p>
                </motion.div>

                {/* Cards with images */}
                <motion.div 
                    className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Photo card */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-elegant-lg border border-white/20">
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden">
                                <Image 
                                    src="/fezin.jpg" 
                                    alt="Foto do casal" 
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-amber-800 font-semibold text-lg">Felipe & Mirian</p>
                                <p className="text-gray-600 text-sm">Nosso momento especial</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code card */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-elegant-lg border border-white/20">
                            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden">
                                <Image 
                                    src="/qqrr.png" 
                                    alt="QR Code para doação" 
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <FaGift className="text-rose-500" />
                                    <p className="text-rose-800 font-semibold text-lg">Contribua</p>
                                </div>
                                <p className="text-gray-600 text-sm">Escaneie o QR Code</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom decorative text */}
                <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="text-amber-700 font-medium text-lg italic">
                        "O amor é a única coisa que cresce à medida que se reparte"
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
