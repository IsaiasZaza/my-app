import Image from "next/image";

export default function HoneymoonDonation() {
    return (
        <section className="font-poppins flex flex-col items-center justify-center py-16 px-6 sm:px-8 bg-gradient-to-b from-gray-50 to-gray-100 text-center relative overflow-hidden">
            {/* SVG decorativo ocupando a tela inteira */}
            <div className="absolute inset-0 top-28 w-full h-full z-10">
                <svg viewBox="0 0 1440 320" className="w-full h-full text-[#A66A42]">
                    <path fill="currentColor" fillOpacity="0.3" d="M0,192L80,181.3C160,171,320,149,480,149.3C640,149,800,171,960,192C1120,213,1280,235,1360,245.3L1440,256V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"></path>
                </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#A66A42] drop-shadow-md z-10">
                Ajude-nos a realizar nossa Lua de Mel! 🌙❤️
            </h2>
            <p className="text-gray-600 max-w-xl sm:max-w-3xl mb-6 sm:mb-8 text-lg sm:text-xl z-10">
                Sua generosidade tornará nosso sonho ainda mais especial. <br />
                Qualquer contribuição será recebida com muito carinho e gratidão! 💕
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 z-10">
                <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200">
                    <Image src="/casamento22.jpg" alt="QR Code para doação" width={180} height={180} className="rounded-lg sm:rounded-xl" />
                </div>
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image src="/qr.png" alt="Foto do Casal" layout="fill" objectFit="cover" />
                </div>
            </div>
        </section>
    );
}
