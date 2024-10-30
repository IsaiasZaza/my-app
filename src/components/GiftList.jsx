"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "@fontsource/roboto";
import Image from "next/image";

// Dados iniciais dos presentes
const initialGifts = [
    { id: 1, name: "Armazenamento", image: "/aramazenamento.jpg", available: 3 },
    { id: 2, name: "Forma de bolo", image: "/bolo.jpg", available: 3 },
    { id: 3, name: "Copos", image: "/copos.jpg", available: 3 },
    { id: 4, name: "Escorredor", image: "/escorredor.jpg", available: 3 },
    { id: 5, name: "Formas de Bolo", image: "/formas de bolo.jpg", available: 3 },
    { id: 6, name: "Jogo de Pratos", image: "/jogo de pratos.jpg", available: 3 },
    { id: 7, name: "Jogo de Sobremesa", image: "/jogo de sobremesa.jpg", available: 3 },
    { id: 8, name: "Jogo de Talheres", image: "/jogo de talheres.jpg", available: 3 },
    { id: 9, name: "Jogo de Travessa", image: "/jogotrave.jpg", available: 3 },
    { id: 10, name: "Jogo de Vasilhas", image: "/jogovasilhas.jpg", available: 3 },
    { id: 11, name: "Lixeira Inox", image: "/lixeira inox.jpg", available: 3 },
    { id: 12, name: "Medidora", image: "/medidora.jpg", available: 5 },
    { id: 13, name: "Porta temperos", image: "/temperos.jpg", available: 5 },
    { id: 14, name: "Tigela", image: "/tigeja.jpg", available: 5 },
    { id: 15, name: "Travessas", image: "/travessas.jpg", available: 5 },
    { id: 16, name: "Tigela de vidro", image: "/vidro.jpg", available: 3 },
    { id: 17, name: "Xícaras", image: "/xicaras.jpg", available: 3 },
];

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
    const [gifts, setGifts] = useState(initialGifts); // Estado inicial com presentes padrão
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    // Carregar os presentes do localStorage após a montagem do componente
    useEffect(() => {
        const storedGifts = localStorage.getItem("gifts");
        if (storedGifts) {
            setGifts(JSON.parse(storedGifts));
        }
    }, []);

    const openModal = (gift) => {
        if (gift.available > 0) {
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

    const handleSubmit = () => {
        const whatsappNumber = "+5561986183812";
        const thankYouMessage = `Obrigado por escolher um presente para o casal! 🎉\n\nDetalhes:\n- Presente: ${selectedGift.name}\n- Quantidade: ${selectedQuantity}\n- Nome: ${name}\n- Mensagem para o casal: ${message || "Nenhuma mensagem"}\n`;

        // Link para envio no WhatsApp
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(thankYouMessage)}`;
        window.open(whatsappLink, "_blank");

        // Atualiza a quantidade do presente selecionado
        const updatedGifts = gifts.map(gift =>
            gift.id === selectedGift.id
                ? { ...gift, available: gift.available - selectedQuantity }
                : gift
        ).filter(gift => gift.available > 0); // Remove itens esgotados

        setGifts(updatedGifts);
        localStorage.setItem("gifts", JSON.stringify(updatedGifts));

        // Fechar o modal após a submissão
        closeModal();
    };

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
                            className={`bg-white rounded-lg shadow-lg overflow-hidden ${gift.available <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <Image width={300} height={300} src={gift.image} alt={gift.name} className="w-full h-72 object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-green-900">{gift.name}</h3>
                                <button
                                    onClick={() => openModal(gift)}
                                    className="mt-4 px-6 py-2 bg-green-900 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
                                    disabled={gift.available <= 0}
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
                                {selectedGift.name}
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
                                    disabled={selectedGift.available <= 0}
                                >
                                    {[...Array(selectedGift.available).keys()].map((index) => (
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
