import { motion } from "framer-motion";
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-16 sm:py-20 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-200/20 to-amber-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Main content */}
                <motion.div 
                    className="text-center space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                            <FaHeart className="mx-6 text-amber-500 text-2xl animate-pulse" />
                            <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold gradient-text">
                            Felipe & Mirian
                        </h2>

                        <p className="text-lg sm:text-xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
                            "O amor é a única coisa que cresce à medida que se reparte." 💕
                        </p>
                    </div>
                    {/* Thank you message */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                            Agradecemos por fazer parte desse momento especial. 
                            Sua presença e carinho tornam nossa celebração ainda mais significativa. 
                            Nos vemos no nosso chá de panela!
                        </p>

                        <div className="flex items-center justify-center gap-2 text-amber-600">
                            <FaHeart className="animate-pulse" />
                            <span className="font-medium">Com muito amor e gratidão</span>
                            <FaHeart className="animate-pulse" />
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center justify-center">
                        <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        <div className="mx-4 w-2 h-2 bg-amber-500 rounded-full"></div>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
                    </div>

                    {/* Copyright */}
                    <motion.div 
                        className="text-gray-600 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <p>
                            © 2025 Desenvolvido com muito amor e carinho por{' '}
                            <span className="font-semibold text-amber-700">Isaias</span>. 
                            Todos os direitos reservados.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;
