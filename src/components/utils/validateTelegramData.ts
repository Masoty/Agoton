import crypto from "crypto";

export const validateTelegramData = (telegramInitData: string): boolean => {
    const urlParams = new URLSearchParams(telegramInitData);
    
    const hash = urlParams.get("hash");
    urlParams.delete("hash");
    urlParams.sort();
    
    let dataCheckString = "";
    // @ts-ignore
    for (const [key, value] of urlParams.entries()) {
        dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);
    
    const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(process.env.TELEGRAM_BOT_KEY ?? "");
    const calculatedHash = crypto
    .createHmac("sha256", secret.digest())
    .update(dataCheckString)
    .digest("hex");
    
    return calculatedHash === hash;
};
