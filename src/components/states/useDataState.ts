"use client";

import { create } from "zustand";
import { DEFAULT_DATA_STATE, UserData, UserDataValidate } from "@/components/db/types";
import axios from "axios";
import { transformData } from "@/components/shared/Functions";

export interface GlobalState extends UserData {
    uploadData: (data: GlobalState) => void;
    
    getTimeFinishMining: () => number;
    getTimeReferralsClaimButton: () => number;
    getTimeEndDay: () => number;
    
    updateStartMiningButton: () => void;
    updateTimeFinishMining: () => void;
    updateMoney: (money: number) => void;
    updateMining: (money: number) => void;
    updateTimeReferralsClaimButton: () => void;
    updateReferPercentage: (initData: string, money: number) => void;
    updateTimeEndDay: () => void;
    updatePlanets: (planets: UserData['planets']) => void;
    getLastActivity: () => number;
    updateLastActivity: (initData: string) => void;
    updateTasks: (tasks: UserData['tasks']) => void;
    
    synchronizationData: (initData: string, then?: () => void) => void;
    uploadDataServer: (initData: string) => void;
}

const useTasksState = create<GlobalState>()((set, getState) => ({
    ...DEFAULT_DATA_STATE,
    
    uploadData: (data) =>
        set(() => {
            if (!data) {
                return {};
            }
            
            return {
                ...data
            };
        }),
    synchronizationData: (initData, then) => {
        axios.get(`/api/userData?${initData}`).then(data => {
            getState().uploadData(data.data);
        }).then(then).then(() => getState().uploadDataServer(initData));
    },
    uploadDataServer: (initData) => {
        const data = transformData(getState(), UserDataValidate);
        
        axios.post(`/api/userData`, {
            query: initData,
            data: data
        });
    },
    updateStartMiningButton: () => {
        set(() => {
            return {
                startMiningButton: !getState().startMiningButton
            };
        });
    },
    updateTimeFinishMining: () => {
        set(() => {
            
            if (getState().getTimeFinishMining() != 0) {
                return {};
            }
            
            const currentDate = +Date.now();
            const futureDate = +new Date(currentDate + 10 * 1000);
            
            return {
                timeFinishMining: futureDate
            };
        });
    },
    getTimeFinishMining: () => {
        
        const time = getState().timeFinishMining;
        const timeNow = +new Date();
        
        if (timeNow > time) {
            return 0;
        }
        
        return Number(((time - timeNow) / 1000).toFixed(0));
        
    },
    updateMoney: (money) => {
        set(() => {
            return {
                money: getState().money + money
            };
        });
    },
    getTimeReferralsClaimButton: () => {
        
        const time = getState().timeReferralsClaimButton;
        const timeNow = +new Date();
        
        if (timeNow > time) {
            return 0;
        }
        
        return Number(((time - timeNow) / 1000).toFixed(0));
    },
    updateTimeReferralsClaimButton: () => {
        set(() => {
            if (getState().getTimeReferralsClaimButton() != 0) {
                return {};
            }
            
            const currentDate = +Date.now();
            const futureDate = +new Date(currentDate + 3599 * 1000);
            
            return {
                money: getState().money + getState().moneyFromReferrals,
                moneyFromReferrals: 0,
                timeReferralsClaimButton: futureDate
            }
        })
    },
    updateReferPercentage: (initData, money) => {
        axios.post(`/api/referralsProfit`, {
            query: initData,
            data: {
                refer: getState().refer,
                money: money
            }
        });
    },
    getTimeEndDay: () => {
        const time = getState().timeEndDay;
        const timeNow = +new Date();
        
        if (timeNow > time) {
            
            if (timeNow - time > 86000000) {
                set(() => {
                    return {
                        day: 0
                    };
                });
            }
            
            return 0;
        }
        
        return Number(((time - timeNow) / 1000).toFixed(0));
    },
    updateTimeEndDay: () => {
        if (getState().getTimeEndDay() != 0) {
            return {};
        }
        
        const currentDate = +Date.now();
        const futureDate = +new Date(currentDate + 86_400 * 1000);
        
        set(() => {
            return {
                day: getState().day + 1 === 7 ? 0 : getState().day + 1,
                timeEndDay: futureDate
            };
        });
        
    },
    updatePlanets: (planets) => {
        set(() => {
            return {
                planets: planets
            };
        });
    },
    updateMining: (mining) => {
        set(() => {
            return {
                mining: getState().mining + mining
            };
        });
    },
    getLastActivity: () => {
        const time = getState().lastActivity;
        const timeNow = +new Date();
        
        return Number(((timeNow - time) / 1000).toFixed(0));
    },
    updateLastActivity: (initData) => {
        axios.post(`/api/lastActivity`, {
            query: initData,
        });
    },
    updateTasks: (tasks) => {
        set(() => {
            return {
                tasks: tasks
            };
        });
    },
    
}));

export default useTasksState;
