import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  try {
    let { input, history } = await req.json();
    // console.log("input response", input[0].parts);
    console.log("input response", input);
    // console.log("input response",input[input.length() - 1].parts.text)

    // const  parts = input.parts;
    // console.log("req body text", parts);

    // input =
    console.log("History", history);

    if (!input) {
      return NextResponse.json({ message: "please enter a input", satus: 400 });
    }
    const api_key = process.env.GEMINI_API_KEY;
    const Ai_model = new GoogleGenAI({ apiKey: api_key });

    const chat = Ai_model.chats.create({
      model: "gemini-2.5-flash",
      history,
    });

    const response = await chat.sendMessage({ message: input });
    // console.log("ai response",resp)

    // const resp_data = await resp.candidates[0].content
    // console.log("ai response",resp_data)
    // input.push(resp_data)
    //   const text2 = resp_data.text
    console.log("response: ", response.text);
    history = [
      ...history,
      { parts: [{ text: input }], role: "user" },
      { parts: [{ text: response.text }], role: "model" },
    ];
    return NextResponse.json({ history, text: response.text }, { status: 201 });
  } catch (error) {
    console.log();
    return NextResponse.json({ error: error?.message, status: 500 });
  }
}

export { POST };
