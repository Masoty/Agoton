"use client";

import React from "react";
import { prettify } from "@/components/shared/Functions";
import useDataState from "@/components/states/useDataState";

const MiningScoreboard = () => {
    
    const mining = useDataState(state => state.mining)
    
    return (
        <div className="flex flex-col text-center">
            <span className="text-[10px] -mb-1">Mining peer time</span>
            <span className="tracking-wider">+{prettify(Number(mining.toFixed(2)))}/hour</span>
        </div>
    );
};

export default MiningScoreboard;
