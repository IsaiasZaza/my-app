"use client";

import { useState } from 'react';
import { Modal, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';

const Menu = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openAddGiftModal, setOpenAddGiftModal] = useState(false);
    const [giftData, setGiftData] = useState({ nome: '', quantidade: 0, image: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const handleOpenLogin = () => setOpenLoginModal(true);
    const handleCloseLogin = () => setOpenLoginModal(false);
    const handleOpenAddGiftModal = () => setOpenAddGiftModal(true);
    const handleCloseAddGiftModal = () => setOpenAddGiftModal(false);

    // Função para lidar com o login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://end-three.vercel.app/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setSnackbarMessage('Login realizado com sucesso!');
                setSnackbarSeverity('success');
                setOpenLoginModal(false);
                handleOpenAddGiftModal();
            } else {
                setSnackbarMessage('Credenciais inválidas! Tente novamente.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setSnackbarMessage('Erro ao realizar login! Tente novamente mais tarde.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true); // Exibe a Snackbar de feedback
        }
    };

    // Função para lidar com o envio do presente
    const handleCreateGift = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://end-three.vercel.app/api/gift', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(giftData),
            });

            if (response.ok) {
                setSnackbarMessage('Presente criado com sucesso!');
                setSnackbarSeverity('success');
                setGiftData({ nome: '', quantidade: 0, image: '' });
                setOpenAddGiftModal(false);
            } else {
                setSnackbarMessage('Erro ao criar presente. Tente novamente.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Erro ao criar presente:', error);
            setSnackbarMessage('Erro ao criar presente! Tente novamente mais tarde.');
            setSnackbarSeverity('error');
        } finally {
            setOpenSnackbar(true); // Exibe a Snackbar de feedback
        }
    };

    return (
        <header className="w-full bg-gray-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-serif font-bold text-green-900">J&L</div>

                {/* Navigation Links */}
                <nav className="space-x-8 text-sm font-semibold text-green-900">
                    <ScrollLink
                        to="giftList"
                        smooth={true}
                        duration={500}
                        className="hover:text-green-700 transition-colors cursor-pointer"
                    >
                        Presentes
                    </ScrollLink>
                    {!isAuthenticated ? (
                        <button
                            onClick={handleOpenLogin}
                            className="focus:outline-none hover:text-green-700 transition-colors"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleOpenAddGiftModal}
                            className="focus:outline-none hover:text-green-700 transition-colors"
                        >
                            Adicionar Presente
                        </button>
                    )}
                </nav>
            </div>

            {/* Modal de Login */}
            <Modal open={openLoginModal} onClose={handleCloseLogin}>
                <Box className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative">
                        <button
                            onClick={handleCloseLogin}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-green-900 mb-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Senha"
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="mt-4"
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>

            {/* Modal para Adicionar Presente */}
            <Modal open={openAddGiftModal} onClose={handleCloseAddGiftModal}>
                <Box className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative">
                        <button
                            onClick={handleCloseAddGiftModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-green-900 mb-4">Adicionar Presente</h2>
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

            {/* Snackbar para Feedback de Login ou Criação de Presente */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </header>
    );
};

export default Menu;
