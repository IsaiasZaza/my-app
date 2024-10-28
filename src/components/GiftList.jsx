"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

// Dados dos presentes
const gifts = [
    { id: 1, name: "Conjunto de Panelas", image: "/panelas.jpg", available: 5 },
    { id: 2, name: "Jogo de Talheres", image: "/talheres.jpg", available: 2 },
    { id: 3, name: "Aparelho de Jantar", image: "/jantar.jpg", available: 0 },
    { id: 4, name: "Liquidificador", image: "/liquidificador.jpg", available: 3 },
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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const openModal = (gift) => {
        setSelectedGift(gift);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedGift(null);
        setSelectedQuantity("");
        setName("");
        setEmail("");
    };

    const handleQuantityChange = (event) => {
        setSelectedQuantity(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        // Implementar lógica de submissão aqui, como enviar os dados para o servidor
        closeModal();
    };

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8">
            <h2 className="text-3xl font-bold text-center text-green-900">Lista de Presentes</h2>
            
            <Swiper
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                loop={true}
                className="flex justify-center"
            >
                {gifts.map((gift) => (
                    <SwiperSlide key={gift.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-green-900">{gift.name}</h3>
                                <button
                                    onClick={() => openModal(gift)}
                                    className="mt-4 px-6 py-2 bg-green-900 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
                                >
                                    Ver Mais
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Modal */}
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
                                    label="Seu Email"
                                    variant="outlined"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
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

                            {selectedGift.available <= 0 && (
                                <Typography variant="body1" color="text.secondary" className="mt-2">
                                    Indisponível no momento.
                                </Typography>
                            )}

                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={handleSubmit}
                                sx={{ mt: 3 }}
                                disabled={!name || !email || !selectedQuantity}
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
