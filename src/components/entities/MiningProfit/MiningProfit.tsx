'use client'

import React, { useEffect, useState } from "react";
import { Fade, Modal } from "@mui/material";
import Container from "@/components/shared/Container";
import useDataState from "@/components/states/useDataState";
import { useTelegram } from "@/components/middlewares/TelegramProvider";
import { prettifySpace } from "@/components/shared/Functions";


const MiningProfit = () => {
    
    const {webApp} = useTelegram()
    
    const [open, setOpen] = useState(false);
    const [startInterval, setStartInterval] = useState(false);
    
    const getLastActivity = useDataState(state => state.getLastActivity);
    const mining = useDataState(state => state.mining);
    const updateLastActivity = useDataState(state => state.updateLastActivity);
    const synchronizationData = useDataState(state => state.synchronizationData);
    const updateMoney = useDataState(state => state.updateMoney);
    const updateReferPercentage = useDataState(state => state.updateReferPercentage);
    
    const moneyProfit = Number((getLastActivity() > 20 ? getLastActivity() < 14400 ? (mining / 3600) * getLastActivity() : mining * 4 : 0).toFixed(2))
    
    if (!startInterval) {
        setInterval(() => {
            updateLastActivity(webApp?.initData as string)
        }, 5000);
        setStartInterval(true)
    }
    
    useEffect(() => {
        if (moneyProfit > 1) {
            setOpen(true);
        }
    }, []);
    
    const onCommit = () => {
        setOpen(false)
        
        synchronizationData(webApp?.initData as string, () => {
            updateMoney(moneyProfit)
            updateReferPercentage(webApp?.initData as string, moneyProfit)
            updateLastActivity(webApp?.initData as string)
        })
        
    };
    
    
    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            onClose={onCommit}
            aria-describedby="modal-description"
            className="fixed flex size-full flex-col justify-end"
        >
            <Fade in={open} timeout={{ enter: 500, exit: 500 }}>
                <div className={`${open ? "modal-slide-down" : "modal-slide-down-close"} size-full bg-bg bg-cover flex flex-col`}>
                    <Container className="flex flex-col py-5 mt-auto justify-center gap-5 h-[70%]">
                        
                        <span className='text-center text-4xl font-bold'>When you cooled down, we earned you</span>
                        
                        <span className='text-center text-3xl font-bold'>{prettifySpace(moneyProfit)} AG</span>
                        
                        <button onClick={onCommit} className="mt-auto bg-white text-black rounded-full text-3xl py-3 ">
                            Collect
                        </button>
                    
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default MiningProfit;


