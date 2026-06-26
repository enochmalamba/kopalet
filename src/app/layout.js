import { Inter, Orbitron } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });

export const metadata = {
  title: "Kopalet",
  description: "Careers, jobs, marketplace and more in Malawi",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
