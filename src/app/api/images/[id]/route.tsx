import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export const GET = async (request: NextRequest) => {
    
    const url = new URL(request.url);
    
    const id = url.pathname.replace("/api/images/", "");
    
    let imgBuffer = fs.readFileSync(`public/photos/1.png`);
    
    try {
        imgBuffer = fs.readFileSync(`public/photos/${id}`);
    } catch (e) {

    }
    
    return new NextResponse(
        imgBuffer,
        {
            status: 200,
            headers: {
                "Content-Type": "image/png"
            }
        }
    );
};







