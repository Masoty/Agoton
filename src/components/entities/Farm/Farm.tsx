'use client'

import React, { useEffect, useMemo, useState } from "react";
import useDataState from "@/components/states/useDataState";
import { formatTimeLeft, prettifySpace } from "@/components/shared/Functions";
import { useTelegram } from "@/components/middlewares/TelegramProvider";

const Farm = () => {
    
    const {webApp} = useTelegram()
    const [counter, setCounter] = useState(true)
    const [animation, setAnimation] = useState(false)
    
    const startMiningButton = useDataState(state => state.startMiningButton)
    const mining = useDataState(state => state.mining)
    const getTimeFinishMining = useDataState(state => state.getTimeFinishMining)
    
    const updateTimeFinishMining = useDataState(state => state.updateTimeFinishMining)
    const updateStartMiningButton = useDataState(state => state.updateStartMiningButton)
    const updateMoney = useDataState(state => state.updateMoney)
    const updateReferPercentage = useDataState(state => state.updateReferPercentage)
    
    const synchronizationData = useDataState(state => state.synchronizationData)
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => !prev)
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    
    const startMining = () => {
        synchronizationData(webApp?.initData as string, () => {
            updateStartMiningButton()
            updateTimeFinishMining()
        })
    }
    
    const onClaim = () => {
        
        setAnimation(true)
        
        updateStartMiningButton()
        
        setTimeout(() => {
            synchronizationData(webApp?.initData as string, () => {
                updateStartMiningButton()
                updateMoney(mining*4)
                updateReferPercentage(webApp?.initData as string, mining*4)
            })
        }, 2000)
        
        setTimeout(() => {
            setAnimation(false)
        }, 2000)
    }
    
    return (
        <div className='absolute bottom-[105px] flex w-full justify-center transition'>
            
            
            {startMiningButton && getTimeFinishMining() == 0 ? <button onClick={!animation ? startMining : () => {}}
                                                                       className='text-[20px] tracking-wider w-fit bg-grey py-2 px-10 rounded-full'>
                Start farming
            </button> : !startMiningButton && getTimeFinishMining() == 0 ? <button onClick={onClaim}
                                                                                   className='text-[20px] tracking-wider w-fit bg-green-700 py-2 px-20 rounded-full'>
                    Claim
                </button> :
                <button
                    className='text-[20px] tracking-wider w-fit bg-grey py-2 px-10 rounded-full'>
                    {formatTimeLeft(getTimeFinishMining())}
                </button>
            }
            
            <div
                className={animation ? 'number' : 'hidden'}
            >
                +{prettifySpace(mining*4)}
            </div>
        
        </div>
    );
};

export default Farm;