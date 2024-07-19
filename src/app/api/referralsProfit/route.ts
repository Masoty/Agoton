import { getValidUser } from "@/components/shared/DataServer";
import { userDataService } from "@/components/db/userDataService";
import {z} from "zod";
import { UserData } from "@/components/db/types";
import { calculatePercentage } from "@/components/shared/Functions";

const ValidateData = z.object({
    refer: z.number(),
    money: z.number(),
})

export async function POST(req: Request) {
    const request = await req.json();
    
    const { query, data} = request;
    
    if (!query) {
        return Response.json({});
    }
    
    const validateUser = getValidUser(query);
    
    const validateData = ValidateData.safeParse(data);
    
    console.log(validateData)
    
    if (!validateData.success) {
        return Response.json({});
    }
    
    if (validateUser.valid && validateUser.userData) {
        
        const dataRefer: UserData = await userDataService.getUserData(data.refer)
        
        if (!dataRefer) {
            return Response.json({});
        }
        
        console.log(dataRefer)
        
        const userId = dataRefer.referrals.findIndex(item => item.id === validateUser.userData.id)
        
        console.log(userId)
        
        if (userId === -1) {
            return Response.json({});
        }
        
        dataRefer.referrals[userId].money += data.money;
        dataRefer.moneyFromReferrals += calculatePercentage(data.money, 5);
        
        await userDataService.writeUserData(dataRefer);
        
        return Response.json({});
        
    }
    
    return Response.json({});
}













