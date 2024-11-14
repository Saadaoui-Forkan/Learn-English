import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!openai.apiKey) {
      return NextResponse.json(
        { error: "Your API Key is required!" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get("file") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Audio file is required!" },
        { status: 400 }
      );
    }

    const res = await openai.audio.transcriptions.create({
      file: audioFile,              
      model: "whisper-1",           
      response_format: "json",      
      language: "en",               
    });

    return NextResponse.json({ text: res.text });
  } catch (error) {
    console.error("Error during API call:", error);
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
