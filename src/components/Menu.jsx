"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';

const Menu = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <header className="w-full bg-gray-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-serif font-bold text-green-900">
                    <Link href="/">
                        J&L
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="space-x-8 text-sm font-semibold text-green-900">
                    <button
                        onClick={handleOpen}
                        className="focus:outline-none hover:text-green-700 transition-colors"
                    >
                        Bem-vindos!
                    </button>
                    <ScrollLink
                        to="giftList"
                        smooth={true}
                        duration={500}
                        className="hover:text-green-700 transition-colors cursor-pointer"
                    >
                        Presentes
                    </ScrollLink>
                </nav>
            </div>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    className="flex items-center justify-center min-h-screen p-4"
                >
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Fechar"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-green-900 mb-4">
                            Bem-vindos ao nosso site!
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Estamos muito felizes em compartilhar este momento especial com você!
                        </p>
                        <p className="font-bold text-green-900">
                            Mateus 19:5-6
                        </p>
                        <p className="text-gray-700">
                            "Assim, eles já não são dois, mas sim uma só carne. Portanto, ninguém separe o que Deus uniu."
                        </p>
                    </div>
                </Box>
            </Modal>
        </header>
    );
};

export default Menu;
