// ParallaxSection.js
"use client";

export default function ParallaxSection() {
    return (
        <div
            className="h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center text-white"
            style={{ backgroundImage: "url('/parallax.jpg')" }} // Substitua pela imagem desejada
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
                <h2 className="text-4xl font-bold mb-4">Leticia & Junio</h2>
                <p className="text-xl">09 Novembro 2024</p>
            </div>
        </div>
    );
}
