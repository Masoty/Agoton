"use client";

import React from "react";
import Container from "@/components/shared/Container";
import FriendScoreboard from "@/components/entities/FriendScoreboard/FriendScoreboard";
import InfoFriendIcon from "@/components/entities/InfoFriendIcon/InfoFriendIcon";
import CopyUrlFriends from "@/components/entities/CopyUrlFriends/CopyUrlFriends";
import useDataState from "@/components/states/useDataState";
import FriendsClaim from "@/components/entities/FriendsClaim/FriendsClaim";
import { prettifySpace } from "@/components/shared/Functions";

const Friends = () => {
    
    const referrals = useDataState(state => state.referrals);
    const moneyFromReferrals = useDataState(state => state.moneyFromReferrals);
    
    return (
        <Container className="flex flex-col gap-3 hide">
            <div className="flex relative mt-5 w-full justify-center">
                <h1 className="text-center text-2xl">Invite Friends</h1>
                <InfoFriendIcon />
            </div>
            <div className="flex flex-col">
                <div className="flex bg-greyRGBA p-5 w-[80%] mx-auto rounded-2xl justify-center text-[20px] font-bold">
                    <span>AG {prettifySpace(Number(moneyFromReferrals.toFixed(2)))}</span>
                </div>
                <FriendsClaim/>
            </div>
            <div className="flex flex-col gap-2 pb-40">
                <div className="flex justify-between">
                <span className="text-[20px]">Friends list</span>
                    <CopyUrlFriends />
                </div>
                
                {
                    referrals.map(referral => (
                        <FriendScoreboard key={referral.id} id={referral.id} name={referral.username} money={referral.money} />
                    ))
                }

            </div>
        </Container>
    );
};

export default Friends;