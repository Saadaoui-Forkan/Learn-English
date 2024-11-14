import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const req = await request.json()
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: req.message 
                    }
                ]
            })
        }
       const res = await fetch('https://api.openai.com/v1/chat/completions', options) 
        const data = await res.json()
        return NextResponse.json(data);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}