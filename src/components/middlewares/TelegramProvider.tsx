'use client'

import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {WebApp, WebAppUser} from "./TelegramTypes";


export interface ITelegramContext {
    webApp?: WebApp;
    user?: WebAppUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
                                     children,
                                 }: {
    children: React.ReactNode;
}) => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);


    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
        }
    }, []);

    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                unsafeData: webApp.initDataUnsafe,
                user: webApp.initDataUnsafe.user,
            }
            : {};
    }, [webApp]);

    return (
        <TelegramContext.Provider value={value}>
            {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);