const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-100 to-white py-8 text-center text-[#A66A42] font-poppins">
            <div className="max-w-4xl mx-auto space-y-6 px-6">
                <h2 className="text-2xl font-bold tracking-wide">Larissa & João</h2>

                <p className="text-md text-gray-700 italic">
                    "O amor é a única coisa que cresce à medida que se reparte." 💕
                </p>

                <hr className="border-t-2 border-[#A66A42] w-24 mx-auto opacity-50" />

                <p className="text-sm px-4 text-gray-600">
                    Agradecemos por fazer parte desse momento especial. Nos vemos no nosso chá de panela!
                </p>

                <p className="text-xs text-gray-500 mt-6">
                    © 2025 Desenvolvido com muito amor e carinho por <span className="font-semibold">Isaias</span>. 
                    Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
