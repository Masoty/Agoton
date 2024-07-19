import fs from "fs";
import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {

    const formData = await req.formData();
    
    const jsonString = formData.getAll('json')
    
    if (!jsonString) {
        return NextResponse.json({})
    }
    
    try {
        // @ts-ignore
        const json = JSON.parse(jsonString as string)
        
        if (json.key != process.env.TELEGRAM_BOT_KEY) {
            return NextResponse.json({})
        }
        
    } catch (e) {
        return NextResponse.json({})
    }

    // @ts-ignore
    const files_list: File[] = formData.getAll('file')

    for (const file of files_list) {
        const file_bytes = await file.arrayBuffer()

        fs.writeFileSync(`public/photos/${file.name}`, Buffer.from(file_bytes))
    }

    return NextResponse.json({})
}
