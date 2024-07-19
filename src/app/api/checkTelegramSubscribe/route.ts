import { getValidUser } from "@/components/shared/DataServer";
import axios from 'axios';
import { tasks } from "../../../../config";


const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_KEY}/getChatMember`;


// Функция для проверки пользователя в чате
async function checkUserInChat(user_id: number, chat_id: number) {
    
    const params = {
        chat_id: chat_id,
        user_id: user_id
    };
    
    try {
        const response = await axios.post(url, params);
        const data = response.data;
        
        console.log(data)
        
        if (data.ok) {
            const status = data.result.status;
            return status != 'left';
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export async function POST(req: Request) {
    const request = await req.json();
    
    const { query, chatId} = request;
    
    if (!query) {
        return Response.json({mes: false});
    }
    
    const validateUser = getValidUser(query);
    
    if (validateUser.valid && validateUser.userData) {
        
        const isChat = await checkUserInChat(validateUser.userData.id, chatId);
        
        console.log(isChat)
        
        return Response.json({mes: isChat});
        
    }
    
    return Response.json({mes: false});
}