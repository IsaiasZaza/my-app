import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Felipe & Mirian - Chá de Panela",
  description: "Convidamos você para celebrar conosco nosso chá de panela! Um momento especial para começar nossa nova jornada juntos.",
  keywords: "chá de panela, Larissa, João, casamento, presentes, lista de presentes",
  authors: [{ name: "Isaias" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
