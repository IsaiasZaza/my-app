"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinish }) => {
  const messages = [
    "Preparando um dia especial...",
    "Enchendo o site de amor...",
    "Quase lá, segurando a emoção..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500); // Troca a mensagem a cada 2.5 segundos

    setTimeout(() => {
      clearInterval(interval);
      setShow(false);
      setTimeout(onFinish, 1000); // Adiciona um delay para uma transição mais suave
    }, 7500); // Tempo total de 7.5 segundos

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
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to-gray-600 text-white"
        >
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-serif italic text-center px-6"
          >
            {messages[messageIndex]}
          </motion.p>

          {/* Spinner elegante */}
          <div className="mt-6 w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
