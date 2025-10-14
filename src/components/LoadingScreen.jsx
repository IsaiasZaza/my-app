"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaGift, FaCalendarAlt } from "react-icons/fa";

const LoadingScreen = ({ onFinish }) => {
  const messages = [
    "Preparando um dia especial...",
    "Enchendo o site de amor...",
    "Quase lá, segurando a emoção...",
    "Criando memórias inesquecíveis..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Troca a mensagem a cada 3 segundos

    setTimeout(() => {
      clearInterval(interval);
      setShow(false);
      setTimeout(onFinish, 1500); // Adiciona um delay para uma transição mais suave
    }, 12000); // Tempo total de 12 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-2xl animate-float will-change-transform"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-rose-200/20 to-pink-300/20 rounded-full blur-xl animate-float will-change-transform" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-8 relative z-10">
            {/* Logo and decorative elements */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                <FaHeart className="mx-6 text-amber-500 text-3xl animate-pulse will-change-transform" />
                <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold gradient-text">
                Felipe & Mirian
              </h1>

              <p className="text-xl sm:text-2xl text-amber-700 font-medium">
                Chá de Panela
              </p>
            </motion.div>

            {/* Loading message */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="text-lg sm:text-xl text-gray-700 font-medium"
                >
                  {messages[messageIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Elegant loading spinner */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce will-change-transform"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce will-change-transform" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce will-change-transform" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </motion.div>

            {/* Decorative icons */}
            <motion.div
              className="flex items-center justify-center space-x-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <FaGift className="text-amber-500 text-xl" />
              <FaCalendarAlt className="text-orange-500 text-xl" />
              <FaHeart className="text-rose-500 text-xl" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
