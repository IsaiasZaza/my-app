"use client";

import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

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
        <header className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
            isScrolled 
                ? "bg-white/95 backdrop-blur-lg shadow-elegant border-b border-amber-200/30" 
                : "bg-white/20 backdrop-blur-sm"
        }`}>
            <div className="container mx-auto flex items-center justify-between p-4 lg:px-8">
                {/* Logo */}
                <motion.div 
                    className={`text-3xl font-serif font-bold transition-all duration-500 ${
                        isScrolled ? "text-amber-800" : "text-amber-900 drop-shadow-lg"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    F&M
                </motion.div>

                {/* Navigation */}
                <nav className="flex items-center space-x-8">
                    <ScrollLink
                        to="GiftList"
                        smooth={true}
                        duration={500}
                        className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                            isScrolled 
                                ? "text-amber-800 hover:text-amber-600" 
                                : "text-amber-900 hover:text-amber-700 drop-shadow-md"
                        }`}
                    >
                        Presentes
                    </ScrollLink>
                    
                    {!isAuthenticated ? (
                        <motion.button
                            onClick={() => setOpenLoginModal(true)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                isScrolled
                                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl"
                                    : "bg-amber-500/90 text-white hover:bg-amber-600 shadow-lg backdrop-blur-sm border border-amber-400/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={() => setOpenAddGiftModal(true)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                isScrolled
                                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl"
                                    : "bg-amber-500/90 text-white hover:bg-amber-600 shadow-lg backdrop-blur-sm border border-amber-400/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Adicionar Presente
                        </motion.button>
                    )}
                </nav>
            </div>

            <Modal open={openLoginModal} onClose={handleCloseLogin}>
                <Box className="flex items-center justify-center min-h-screen p-4">
                    <motion.div 
                        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-elegant-lg w-full max-w-md p-8 text-center relative border border-white/20"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={handleCloseLogin}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        
                        <div className="mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">F&M</span>
                                </div>
                            </div>
                            <h2 className="text-3xl font-serif font-bold gradient-text">Login</h2>
                            <p className="text-gray-600 mt-2">Acesse sua conta para gerenciar presentes</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                            <TextField
                                fullWidth
                                label="Senha"
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
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
                                }}
                            >
                                Entrar
                            </Button>
                        </form>
                    </motion.div>
                </Box>
            </Modal>
            <Modal open={openAddGiftModal} onClose={handleCloseAddGiftModal}>
                <Box className="flex items-center justify-center min-h-screen p-4">
                    <motion.div 
                        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-elegant-lg w-full max-w-md p-8 text-center relative border border-white/20"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={handleCloseAddGiftModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        
                        <div className="mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🎁</span>
                                </div>
                            </div>
                            <h2 className="text-3xl font-serif font-bold gradient-text">Adicionar Presente</h2>
                            <p className="text-gray-600 mt-2">Adicione um novo item à lista de presentes</p>
                        </div>
                        
                        <form onSubmit={handleCreateGift} className="space-y-4">
                            <TextField
                                fullWidth
                                label="Nome do Presente"
                                value={giftData.nome}
                                onChange={(e) => setGiftData({ ...giftData, nome: e.target.value })}
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
                            <TextField
                                fullWidth
                                label="Quantidade"
                                type="number"
                                value={giftData.quantidade}
                                onChange={(e) => setGiftData({ ...giftData, quantidade: Number(e.target.value) })}
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
                            <TextField
                                fullWidth
                                label="Imagem (URL)"
                                value={giftData.image}
                                onChange={(e) => setGiftData({ ...giftData, image: e.target.value })}
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
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
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
                                }}
                            >
                                Adicionar Presente
                            </Button>
                        </form>
                    </motion.div>
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