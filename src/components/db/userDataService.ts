import { connectWrapper } from "@/components/db/connection";
import { UserDataModel } from "@/components/db/models";
import { UserData, UserDataValidate } from "@/components/db/types";
import { transformData } from "@/components/shared/Functions";

export class userDataService {
    
    static getUserData = connectWrapper(async (id: number) => {
        const data = await UserDataModel.findOne({id: id})
        
        return data
    })
    
    static writeUserData = connectWrapper(async (data: UserData) => {
        await UserDataModel.updateOne({id: data.id}, data, {upsert: true})
    })
    
}
