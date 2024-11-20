// ParallaxSection.js
"use client";

export default function ParallaxSection() {
    return (
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] text-center overflow-hidden">
            {/* Imagem de fundo */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/bolo.jpg')" }} // Caminho correto da imagem
            ></div>

            {/* Sobreposição para dar contraste ao texto */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Conteúdo principal */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 text-white">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide leading-tight">
                    NOSSO CHÁ DE CASA NOVA
                </h1>
                <p className="text-base md:text-lg mt-4 max-w-2xl">
                    Sim, nós estamos casando! <br />
                    O grande dia será <span className="font-semibold">28 de dezembro</span>. Por isso criamos esse site com a nossa 
                    <span className="italic"> "lista de presentes"</span> para começar essa nova fase juntos. 🎉
                </p>
            </div>
        </div>
    );
}
