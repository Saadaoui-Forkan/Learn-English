import { NextRequest, NextResponse } from "next/server";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.API_KEY,
});

export async function POST(request: NextRequest) {
  const req = await request.json()
  try {
    if (!openai.apiKey) {
        return NextResponse.json(
            { error: "Your Api Key is required!" },
            { status: 500 }
        );
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages:  req.messages,
    });
    
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Error during API call:", error);
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
