import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

// Fontes baseadas no relatório: Playfair (Títulos/Emoção) e Montserrat (UI/Engenharia)
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap'
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Tcar Imports | A Excelência é uma Escolha",
  description: "O maior acervo de superesportivos e blindados do Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-tcar-black text-white antialiased selection:bg-tcar-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}