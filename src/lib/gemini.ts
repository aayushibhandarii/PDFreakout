import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI(
    { 
        apiKey: process.env.GEMINI_API_KEY 
    }
);

export async function generateSummaryFromGemini(pdfText:string) {
    try{
        const chat = client.chats.create({
            config : {
                temperature:0.7,
                maxOutputTokens:1500
            },
            model: "gemini-2.0-flash",
            history: [ // this is the previous talk with gemini
                {
                    role: "user",
                    parts: [{ text:  SUMMARY_SYSTEM_PROMPT}],
                  },
              
            ],
          });
          const response = await chat.sendMessage({ // send this below message and send response
            message:`Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown format : \n\n${pdfText}`
          })
          if(!response){
            throw new Error("Empty response from Gemini API");
          }
          return response.text;
    }catch(err : any){
        throw err;
    }
  
}