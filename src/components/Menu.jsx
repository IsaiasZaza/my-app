"use client";

import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

const Menu = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openAddGiftModal, setOpenAddGiftModal] = useState(false);
    const [giftData, setGiftData] = useState({ nome: "", quantidade: 0, image: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");


    const handleOpenLogin = () => setOpenLoginModal(true);
    const handleCloseLogin = () => setOpenLoginModal(false);
    const handleOpenAddGiftModal = () => setOpenAddGiftModal(true);
    const handleCloseAddGiftModal = () => setOpenAddGiftModal(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <header className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-gray-200 shadow-lg" : "bg-gray-50"}`}>
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className={`text-2xl font-serif font-bold transition-all duration-300 ${isScrolled ? "text-[#744a2e]" : "text-[#A66A42]"}`}>L&J</div>

                <nav className={`space-x-8 text-sm font-semibold transition-all duration-300 ${isScrolled ? "text-[#744a2e]" : "text-[#A66A42] "}`}>
                    <ScrollLink
                        to="GiftList"
                        smooth={true}
                        duration={500}
                        className="hover:text-[#da8b56] transition-colors cursor-pointer"
                    >
                        Presentes
                    </ScrollLink>
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setOpenLoginModal(true)}
                            className="focus:outline-none hover:text-[#da8b56] transition-colors"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => setOpenAddGiftModal(true)}
                            className="focus:outline-none hover:text-[#da8b56] transition-colors"
                        >
                            Adicionar Presente
                        </button>
                    )}
                </nav>
            </div>

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
                        <h2 className="text-2xl font-bold text-[#A66A42] mb-4">Login</h2>
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
                                className="mt-4 bg-[#A66A42] *:hover:first-letter:first-line:marker:selection:file:placeholder:backdrop:before:focus:outline-none focus:ring-2 focus:ring-[#A66A42] focus:ring-opacity-50"
                                style={{ backgroundColor: "#A66A42" }}
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>
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
                        <h2 className="text-2xl font-bold text-[#A66A42] mb-4">Adicionar Presente</h2>
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
                                className="mt-4 bg-[#A66A42] *:hover:first-letter:first-line:marker:selection:file:placeholder:backdrop:before:focus:outline-none focus:ring-2 focus:ring-[#A66A42] focus:ring-opacity-50"
                                style={{ backgroundColor: "#A66A42" }}
                            >
                                Adicionar Presente
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>

            {/* Snackbar de Feedback */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </header>
    );
};

export default Menu;