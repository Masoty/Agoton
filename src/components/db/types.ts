import {z} from "zod";
import { miningPlanet } from "../../../config";



export const UserDataValidate = z.object({
    id: z.number(),
    username: z.string(),
    refer: z.number(),
    referrals: z.array(z.object({
        _id: z.string().optional(),
        id: z.number(),
        username: z.string(),
        money: z.number()
    })),
    day: z.number(),
    timeEndDay: z.number(),
    money: z.number(),
    moneyFromReferrals: z.number(),
    timeReferralsClaimButton: z.number(),
    mining: z.number(),
    startMiningButton: z.boolean(),
    timeFinishMining: z.number(),
    planets: z.array(z.object({
        _id: z.string().optional(),
        level: z.number().max(10),
    })),
    lastActivity: z.number(),
    tasks: z.object({
        telegram: z.boolean(),
        telegram1: z.boolean(),
    })
})

export const UserValidate = z.object({
    id: z.number(),
    username: z.string(),
    refer: z.number(),
    referrals: z.array(z.number()),
})


export const DEFAULT_DATA_STATE: UserData = {
    id: 0,
    username: '',
    refer: 0,
    referrals: [],
    day: 0,
    timeEndDay: 0,
    moneyFromReferrals: 0,
    timeReferralsClaimButton: 0,
    money: 0,
    mining: 0,
    startMiningButton: true,
    timeFinishMining: 0,
    planets: miningPlanet.map(planet => ({
        level: 0
    })),
    lastActivity: +new Date(),
    tasks: {
        telegram: false,
        telegram1: false
    }
}






export type UserData = z.infer<typeof UserDataValidate>
export type User = z.infer<typeof UserValidate>


















