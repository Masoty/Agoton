'use client'

import React from 'react';
import {prettify} from "@/components/shared/Functions";
import useDataState from "@/components/states/useDataState";

const Balance = () => {
    
    const money = useDataState(state => state.money)
    
    return (
        <div className='text-[25px] text-center font-bold text-nowrap'>
            AG {prettify(Number(money.toFixed(2)))}
        </div>
    );
};

export default Balance;