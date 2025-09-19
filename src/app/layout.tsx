
import {Poppins} from "next/font/google";

import 'swiper/css';
import 'swiper/css/pagination';

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner"
import Providers from "@/Providers";

const poppins = Poppins({
  weight:["100","200","300","400","500","600","700","800","900"],
  subsets:["latin"]
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`} >
        <Providers>
        <Navbar />
        <main>{children}</main>
        <Toaster />
        </Providers>
        {/* Footer */}
      </body>
    </html>
  );
}
