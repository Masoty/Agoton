"use client";

import React from "react";
import ShareIcon from '@mui/icons-material/Share';
import { BotUsername } from "../../../../local.env";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { useTelegram } from "@/components/middlewares/TelegramProvider";
import Link from "next/link";

export interface State extends SnackbarOrigin {
    open: boolean;
}

const CopyUrlFriends = () => {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center"
    });
    
    const {webApp} = useTelegram();
    
    const text = '%0APlay%20with%20me,%20become%20a%20star%20invader%20and%20get%20tokens%20through%20airdrop!%0A%F0%9F%92%B8%202.5k%20coins%20as%20the%20first%20gift%0A%F0%9F%94%A5%205k%20coins%20if%20you%20have%20Telegram%20Premium'
    
    //@ts-ignore
    const url = `https://t.me/share/url?url=https://t.me/${BotUsername}?start=${webApp?.initDataUnsafe.user.id}&text=${text}`
    
    const { vertical, horizontal, open } = state;
    
    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ open: true, ...newState });
        
        setTimeout(() => {
            setState({ ...state, open: false });
        }, 2000);
        
        // @ts-ignore
        const url = `https://t.me/${BotUsername}?start=${webApp?.initDataUnsafe.user.id}`;
        
        const textCopy = url + "\n\nPlay with me, become a star invader and get tokens through airdrop!\n" +
            "💸 2.5k coins as the first gift\n" +
            "🔥 5k coins if you have Telegram Premium"
        
        navigator.clipboard.writeText(textCopy);
    };
    
    return (
        <div className='flex gap-1'>
            <button className="bg-violet rounded-full cursor-pointer p-1 px-4 my-auto"
                    onClick={handleClick({ vertical: "top", horizontal: "center" })}>
                Copy
            </button>
            <Link href={url}>
                <ShareIcon
                    fontSize={"large"}
                    className="bg-violet p-2 rounded-full cursor-pointer"
                />
            </Link>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message="link copied"
                key={vertical + horizontal}
            />
        </div>
    );
};

export default CopyUrlFriends;
