// components/Footer.js
import "@fontsource/roboto";
const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 text-center text-green-900 font-roboto">
            <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-lg font-semibold">Leticia & Junio</p>

                <p className="text-sm px-4">
                    Agradecemos por fazer parte desse momento especial. Nos vemos no nosso chá de panela!
                </p>
                <p className="text-xs text-gray-500 mt-4 px-4">
                    © 2024 Desenvolvido com muito amor e carinho por Isaias. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer