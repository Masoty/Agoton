import { getValidUser } from "@/components/shared/DataServer";
import { userDataService } from "@/components/db/userDataService";
import { transformData } from "@/components/shared/Functions";
import { UserDataValidate } from "@/components/db/types";

export async function GET(req: Request) {
    const url = new URL(req.url);
    
    const query = url.search.slice(1);
    
    if (!query) {
        return Response.json({});
    }
    
    const validateUser = getValidUser(query);
    
    if (validateUser.valid && validateUser.userData) {
        
        let data = await userDataService.getUserData(validateUser.userData.id)
        
        data = transformData(data, UserDataValidate)
 
        return Response.json(data);
    
    }
    
    return Response.json({});
}

export async function POST(req: Request) {
    const request = await req.json();
    
    const { query, data } = request;
    
    if (!query) {
        return Response.json({});
    }
    
    const validateUser = getValidUser(query);
    
    const validateData = UserDataValidate.safeParse(data);
    
    if (!validateData.success) {
        return Response.json({});
    }
    
    if (validateUser.valid && validateUser.userData) {
    
        await userDataService.writeUserData(data);
        
        return Response.json({});
    
    }
    
    return Response.json({});
}
