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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch("https://crud-usuario.vercel.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                setIsAuthenticated(true);
                setOpenLoginModal(false);
                setSnackbarMessage("Login realizado com sucesso!");
                setSnackbarSeverity("success");
            } else {
                setSnackbarMessage(data.message || "Erro ao fazer login");
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setSnackbarMessage("Erro de conexão com o servidor");
            setSnackbarSeverity("error");
        } finally {
            setOpenSnackbar(true);
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
                        className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                        Presentes
                    </ScrollLink>
                    {!isAuthenticated ? (
                        <button
                            onClick={() => setOpenLoginModal(true)}
                            className="focus:outline-none hover:text-green-400 transition-colors"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => setOpenAddGiftModal(true)}
                            className="focus:outline-none hover:text-green-400 transition-colors"
                        >
                            Adicionar Presente
                        </button>
                    )}
                </nav>
            </div>

            {/* Modal de Login */}
            <Modal open={openLoginModal} onClose={() => setOpenLoginModal(false)}>
                <Box className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-20">
                    <h2 className="text-lg font-bold mb-4">Login</h2>
                    <TextField
                        label="Email"
                        fullWidth
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="mb-4"
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="mb-4"
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Entrar
                    </Button>
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