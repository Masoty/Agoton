'use client'

import React from "react";
import MiningScoreboard from "@/components/entities/Scoreboard/MiningScoreboard";
import { useTelegram } from "@/components/middlewares/TelegramProvider";
import Image from "next/image";

const Scoreboard = () => {
    
    const {webApp} = useTelegram()
    
    return (
        <div className='flex justify-between p-2 items-center'>
            <Image src={`/api/images/${webApp?.initDataUnsafe.user?.id}.jpg`} alt={'User Photo'} className={'rounded-full'} width={50} height={50}/>
            
            <span className='text-2xl'>@{webApp?.initDataUnsafe?.user?.username}</span>
            <MiningScoreboard/>
        </div>
    );
};

export default Scoreboard;