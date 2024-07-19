import {z} from "zod";
import { DEFAULT_DATA_STATE, User, UserData } from "@/components/db/types";
import { userDataService } from "@/components/db/userDataService";

const dataRegisterValidation = z.object({
    id: z.number(),
    refer: z.number(),
    username: z.string(),
    premium: z.boolean()
})

const GETValidate = z.number()


async function registerUser(userData: z.infer<typeof dataRegisterValidation>) {
    
    try {
        dataRegisterValidation.parse(userData)
    } catch (e) {
        return false
    }
    
    const isUserRegister = await userDataService.getUserData(userData.id)
    
    if (!isUserRegister) {
        
        DEFAULT_DATA_STATE.id = userData.id
        DEFAULT_DATA_STATE.refer = userData.refer
        DEFAULT_DATA_STATE.username = userData.username
        DEFAULT_DATA_STATE.money = userData.premium ? 5000 : 2500
        
        await userDataService.writeUserData(DEFAULT_DATA_STATE)

        const referIsExists = await userDataService.getUserData(userData.refer)

        if (referIsExists) {
            referIsExists.referrals.push({
                id: userData.id,
                username: userData.username,
                money: 0
            })

            await userDataService.writeUserData(referIsExists)

        }
        
    }
    
}

export async function POST(req: Request) {
    
    const data = await req.json()
    
    try {
        dataRegisterValidation.parse(data)
    } catch (e) {
        return Response.json({mes: false})
    }

    await registerUser(data)
    
    return Response.json({})
    
}

export async function GET(req: Request) {
    
    const url = new URL(req.url)
    
    const user_id = url.searchParams.get('user_id')
    
    // @ts-ignore
    const result = await userDataService.getUserData(user_id as number)
    
    return Response.json({ mes: result ? true : false})
    
}