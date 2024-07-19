import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/entities/NavBar/NavBar";
import { TelegramProvider } from "@/components/middlewares/TelegramProvider";
import IsTelegramWebApp from "@/components/middlewares/IsTelegramWebApp";
import BonusDayModalWindow from "@/components/entities/BonusDayModal/BonusDayModalWindow";

const k2d = K2D({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agoton",
  description: "Agoton project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <html lang="en">
      <body className={`${k2d.className} bg-bg bg-contain`}>
      <TelegramProvider>
        <IsTelegramWebApp>
          {children}
          <NavBar />
            <BonusDayModalWindow />
        </IsTelegramWebApp>
      </TelegramProvider>
      </body>
    </html>
  );
}
