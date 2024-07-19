"use client";

import React, { useEffect, useState } from "react";
import { Fade, Modal } from "@mui/material";
import Container from "@/components/shared/Container";
import useDataState from "@/components/states/useDataState";
import Image from "next/image";
import { useTelegram } from "@/components/middlewares/TelegramProvider";


const bonusDay = [
    500,
    1_000,
    5_000,
    10_000,
    25_000,
    50_000,
    100_000
]


const BonusDayModalWindow = () => {
    
    const {webApp} = useTelegram()
    
    const [open, setOpen] = useState(false);
    
    const updateTimeEndDay = useDataState(state => state.updateTimeEndDay)
    const getTimeEndDay = useDataState(state => state.getTimeEndDay)
    const updateMoney = useDataState(state => state.updateMoney)
    const updateReferPercentage = useDataState(state => state.updateReferPercentage)
    
    const synchronizationData = useDataState(state => state.synchronizationData)
    
    const day = useDataState(state => state.day);
    
    useEffect(() => {
        if (getTimeEndDay() === 0) {
            setOpen(true)
        }
    }, []);
    
    const onCommit = () => {
        setOpen(false);
        synchronizationData(webApp?.initData as string, () => {
            updateTimeEndDay()
            updateMoney(bonusDay[day])
            updateReferPercentage(webApp?.initData as string, bonusDay[day])
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
                <div className={`${open ? "modal-slide-down" : "modal-slide-down-close"} size-full bg-bg bg-cover`}>
                    <Container className="flex flex-col py-5 h-full">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-5xl text-center ">Daily revard</h1>
                            <span className="text-5xl text-center">Day {day + 1}</span>
                        </div>
                        
                        <Image className="mx-auto my-auto" src={"/nav/3.svg"} alt={"Icon"} width={150} height={150} />
                        
                        <div className="flex flex-col gap-4 my-auto">
                            <span className={"text-4xl text-center"}>Your daily rewards</span>
                            
                            <span
                                className="border border-white rounded-full text-center text-3xl py-3 mx-auto w-[70%]">
                            + {bonusDay[day]} AG
                        </span>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <span className="text-center">
                                {getTimeEndDay()}
                            Come back tomorrow <br />
                            Tip: Skipping a day resets your check-in.
                        </span>
                            
                            <button onClick={onCommit} className="bg-white text-black rounded-full text-3xl py-3 ">
                                Continue
                            </button>
                        </div>
                    
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default BonusDayModalWindow;