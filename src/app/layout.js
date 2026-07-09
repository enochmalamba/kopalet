import { Inter, Orbitron } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/nav-bar";
import Footer from "@/components/layout/footer";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });

export const metadata = {
  title:
    "Kopalet | Find jobs and hire the best talent in Malawi, Malawi Online Job Vacancies",
  description: "Careers, jobs, marketplace and more in Malawi",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col w-screen">
        <Providers>
          <Navbar />
          <main className="w-full flex flex-col justify-start">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
