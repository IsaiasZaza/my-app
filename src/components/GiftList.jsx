"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "@fontsource/roboto";
import Image from "next/image";

// Estilo para o modal do Material-UI
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: "center",
};

export default function GiftList() {
    const [gifts, setGifts] = useState([]); // Estado inicial vazio para os presentes
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carregar os presentes da API após a montagem do componente
    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch("https://end-three.vercel.app/api/gifts");
                if (!response.ok) {
                    throw new Error("Erro ao carregar os presentes.");
                }
                const data = await response.json();
                setGifts(data); // Substitui os presentes pelo retorno da API
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
        const whatsappNumber = "+5561986183812";
        const thankYouMessage = `Obrigado por escolher um presente para o casal! 🎉\n\nDetalhes:\n- Presente: ${selectedGift.nome}\n- Quantidade: ${selectedQuantity}\n- Nome: ${name}\n- Mensagem para o casal: ${message || "Nenhuma mensagem"}\n`;

        // Link para envio no WhatsApp
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(thankYouMessage)}`;
        window.open(whatsappLink, "_blank");

        // Atualizar o presente no banco de dados
        try {
            const response = await fetch(`https://end-three.vercel.app/api/gift/${selectedGift.id}`, {
                method: "PATCH", // Usando PATCH para atualizar a quantidade
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantidade: selectedGift.quantidade - selectedQuantity, // Atualizando a quantidade
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o presente.");
            }

            // Atualiza os presentes localmente
            const updatedGifts = gifts.map((gift) =>
                gift.id === selectedGift.id
                    ? { ...gift, quantidade: gift.quantidade - selectedQuantity }
                    : gift
            );

            // Se a quantidade do presente chegar a zero, remova o presente da lista
            const giftsAfterUpdate = updatedGifts.filter((gift) => gift.quantidade > 0);

            setGifts(giftsAfterUpdate);
            closeModal();
        } catch (err) {
            console.error(err);
            setError("Não foi possível atualizar o presente.");
        }
    };

    if (loading) return <div className="text-center">Carregando presentes...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8 font-roboto" id="giftList">
            <h2 className="text-3xl font-bold text-center text-green-900">Lista de Presentes</h2>
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
                className="relative flex justify-center"
            >
                <div className="swiper-button-prev text-green-900 -left-6 hover:text-green-700 transition-colors duration-200"></div>
                <div className="swiper-button-next text-green-900 -right-6 hover:text-green-700 transition-colors duration-200"></div>
                {gifts.map((gift) => (
                    <SwiperSlide key={gift.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden ${gift.quantidade <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <img width={300} height={300} src={gift.image} alt={gift.nome} className="w-full h-72 object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-green-900">{gift.nome}</h3>
                                <button
                                    onClick={() => openModal(gift)}
                                    className="mt-4 px-6 py-2 bg-green-900 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
                                    disabled={gift.quantidade <= 0}
                                >
                                    Escolher
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Modal de Detalhes */}
            <Modal open={modalIsOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    {selectedGift && (
                        <div>
                            <Typography variant="h5" component="h2" className="text-green-900 font-bold mb-4">
                                {selectedGift.nome}
                            </Typography>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Seu Nome"
                                    variant="outlined"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Mensagem para o Casal (opcional)"
                                    variant="outlined"
                                    value={message}
                                    onChange={handleMessageChange}
                                    multiline
                                    rows={4}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Quantidade</InputLabel>
                                <Select
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                    label="Quantidade"
                                    disabled={selectedGift.quantidade <= 0}
                                >
                                    {[...Array(selectedGift.quantidade).keys()].map((index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={handleSubmit}
                                sx={{ mt: 3 }}
                                disabled={!name || !selectedQuantity}
                            >
                                Confirmar Presente
                            </Button>

                            <Button
                                onClick={closeModal}
                                variant="text"
                                color="error"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
