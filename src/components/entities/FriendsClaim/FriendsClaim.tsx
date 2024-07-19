"use client";

import React, { useEffect, useState } from "react";
import { useTelegram } from "@/components/middlewares/TelegramProvider";
import useDataState from "@/components/states/useDataState";
import { formatTimeLeft } from "@/components/shared/Functions";

const FriendsClaim = () => {
    
    const { webApp } = useTelegram();
    
    const [counter, setCounter] = useState(true);
    
    const moneyFromReferrals = useDataState(state => state.moneyFromReferrals);
    const updateTimeReferralsClaimButton = useDataState(state => state.updateTimeReferralsClaimButton);
    const getTimeReferralsClaimButton = useDataState(state => state.getTimeReferralsClaimButton);
    const synchronizationData = useDataState(state => state.synchronizationData);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    const onClick = () => {
        synchronizationData(webApp?.initData as string, () => {
            updateTimeReferralsClaimButton();
        });
    };
    
    if (moneyFromReferrals == 0 && getTimeReferralsClaimButton() == 0) {
        return <button className="bg-green-600 w-fit mx-auto py-1 rounded-2xl px-5 -mt-4 no-hover">
            Claim
        </button>;
    }
    
    return (
        getTimeReferralsClaimButton() == 0 ?
            <button className="bg-green-600 w-fit mx-auto py-1 rounded-2xl px-5 -mt-4 no-hover" onClick={onClick}>
                Claim
            </button> :
            <button className="tracking-wider mx-auto w-fit bg-grey rounded-fullmx-auto py-1 rounded-2xl px-5 -mt-4">
                {formatTimeLeft(getTimeReferralsClaimButton())}
            </button>
    );
};

export default FriendsClaim;