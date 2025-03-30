"use client";

import React, { useState } from 'react';
import Menu from './Menu';
import { Modal, Box, TextField, Button } from '@mui/material';

const GiftApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openGiftModal, setOpenGiftModal] = useState(false); // Estado para controlar o modal de presente
    const [giftData, setGiftData] = useState({ nome: '', quantidade: 0, image: '' });

    // Função para abrir o modal de presente
    const handleOpenGiftModal = () => setOpenGiftModal(true);
    const handleCloseGiftModal = () => setOpenGiftModal(false);

    // Função para lidar com a criação do presente
    const handleCreateGift = async (e) => {
        e.preventDefault();
        // Lógica para enviar o presente para a API ou onde for necessário
        console.log("Presente Criado:", giftData);
        alert('Presente criado com sucesso!');
        setOpenGiftModal(false);
    };

    return (
        <div>
            {/* Passa a função `setIsAuthenticated` para o Menu */}
            <Menu setIsAuthenticated={setIsAuthenticated} />

            {/* Conteúdo condicional baseado na autenticação */}
            {isAuthenticated ? (
                <div>
                    <h2>Bem-vindo!</h2>
                    <p>Você está autenticado e pode acessar o conteúdo exclusivo.</p>
                    <Button variant="contained" color="primary" onClick={handleOpenGiftModal}>
                        Adicionar Presente
                    </Button>
                </div>
            ) : (
                <p>Faça login para acessar esta área.</p>
            )}

            {/* Modal para Adicionar Presente */}
            <Modal open={openGiftModal} onClose={handleCloseGiftModal}>
                <Box className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative">
                        <button
                            onClick={handleCloseGiftModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-[#da8b56] mb-4">Adicionar Presente</h2>
                        <form onSubmit={handleCreateGift}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nome do Presente"
                                value={giftData.nome}
                                onChange={(e) => setGiftData({ ...giftData, nome: e.target.value })}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Quantidade"
                                type="number"
                                value={giftData.quantidade}
                                onChange={(e) => setGiftData({ ...giftData, quantidade: Number(e.target.value) })}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Imagem (URL)"
                                value={giftData.image}
                                onChange={(e) => setGiftData({ ...giftData, image: e.target.value })}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="mt-4"
                            >
                                Adicionar Presente
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default GiftApp;
