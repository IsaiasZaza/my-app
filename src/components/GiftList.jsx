"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { FaGift, FaCheck, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Importa o spinner
import "@fontsource/roboto";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: 3,
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
};

export default function GiftList() {
    const [gifts, setGifts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch("https://end-three.vercel.app/api/gifts");
                if (!response.ok) {
                    throw new Error("Erro ao carregar os presentes.");
                }
                const data = await response.json();
                setGifts(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Não foi possível carregar os presentes.");
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    const openModal = (gift) => {
        if (gift.quantidade > 0) {
            setSelectedGift(gift);
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedGift(null);
        setSelectedQuantity("");
        setName("");
        setMessage("");
    };

    const handleQuantityChange = (event) => {
        setSelectedQuantity(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async () => {
        const whatsappNumber = "+5561986526057";
        const thankYouMessage = `Obrigado por escolher um presente para o casal! 🎉\n\nDetalhes:\n- Presente: ${selectedGift.nome}\n- Quantidade: ${selectedQuantity}\n- Nome: ${name}\n- Mensagem para o casal: ${message || "Nenhuma mensagem"}\n`;

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(thankYouMessage)}`;
        window.open(whatsappLink, "_blank");

        try {
            const response = await fetch(`https://end-three.vercel.app/api/gifts/decrement/${selectedGift.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantidade: parseInt(selectedQuantity) }),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar a quantidade do presente.");
            }

            const updatedGift = await response.json();
            const updatedGifts = gifts.map((gift) =>
                gift.id === selectedGift.id
                    ? { ...gift, quantidade: updatedGift.quantidade }
                    : gift
            );
            setGifts(updatedGifts);
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar a quantidade do presente.");
        }

        closeModal();
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color="#065f46" loading={loading} />
            </div>
        );
    if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-8" name="GiftList">
            {/* Header section */}
            <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Decorative elements */}
                <div className="flex items-center justify-center mb-8">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"></div>
                    <FaGift className="mx-6 text-amber-500 text-3xl animate-pulse" />
                    <div className="w-24 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold gradient-text mb-6">
                    Lista de Presentes
                </h2>
                
                <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                    Escolha um presente especial para nos ajudar a começar nossa nova jornada juntos. 
                    Cada item foi selecionado com muito carinho! 💕
                </p>
            </motion.div>

            {/* Gifts grid */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                {gifts
                    .filter((gift) => gift.quantidade > 0)
                    .map((gift, index) => (
                        <motion.div
                            key={gift.id}
                            className="group relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Glow effect */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            
                            {/* Card */}
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-elegant overflow-hidden border border-white/20 group-hover:shadow-elegant-lg transition-all duration-300">
                                {/* Quantity badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                                        {gift.quantidade} disponíveis
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={gift.image} 
                                        alt={gift.nome} 
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-amber-800 transition-colors duration-300">
                                        {gift.nome}
                                    </h3>
                                    
                                    <button
                                        onClick={() => openModal(gift)}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        <FaGift className="text-lg" />
                                        <span>Escolher Presente</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </motion.div>
            <Modal open={modalIsOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    {selectedGift && (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <FaGift className="text-amber-500 text-2xl mr-2" />
                                    <Typography variant="h4" component="h2" className="font-serif font-bold gradient-text">
                                        {selectedGift.nome}
                                    </Typography>
                                </div>
                                <p className="text-gray-600">Preencha os dados para confirmar seu presente</p>
                            </div>

                            {/* Form */}
                            <div className="space-y-4">
                                <FormControl fullWidth>
                                    <TextField
                                        label="Seu Nome"
                                        variant="outlined"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                '&:hover fieldset': {
                                                    borderColor: '#f59e0b',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#f59e0b',
                                                },
                                            },
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label="Mensagem para o Casal (opcional)"
                                        variant="outlined"
                                        value={message}
                                        onChange={handleMessageChange}
                                        multiline
                                        rows={3}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                '&:hover fieldset': {
                                                    borderColor: '#f59e0b',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#f59e0b',
                                                },
                                            },
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Quantidade</InputLabel>
                                    <Select
                                        value={selectedQuantity}
                                        onChange={handleQuantityChange}
                                        label="Quantidade"
                                        disabled={selectedGift.quantidade <= 0}
                                        sx={{
                                            borderRadius: '12px',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#f59e0b',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#f59e0b',
                                            },
                                        }}
                                    >
                                        {[...Array(selectedGift.quantidade).keys()].map((index) => (
                                            <MenuItem key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSubmit}
                                    disabled={!name || !selectedQuantity}
                                    startIcon={<FaCheck />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                                        borderRadius: '12px',
                                        py: 1.5,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.4)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #d97706, #c2410c)',
                                            boxShadow: '0 6px 20px 0 rgba(245, 158, 11, 0.6)',
                                        },
                                        '&:disabled': {
                                            background: '#d1d5db',
                                            color: '#9ca3af',
                                        },
                                    }}
                                >
                                    Confirmar Presente
                                </Button>

                                <Button
                                    onClick={closeModal}
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<FaTimes />}
                                    sx={{
                                        borderRadius: '12px',
                                        py: 1.5,
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        textTransform: 'none',
                                        borderColor: '#ef4444',
                                        color: '#ef4444',
                                        '&:hover': {
                                            borderColor: '#dc2626',
                                            backgroundColor: 'rgba(239, 68, 68, 0.04)',
                                        },
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
