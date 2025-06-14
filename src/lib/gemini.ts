import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI(
    { 
        apiKey: process.env.GEMINI_API_KEY 
    }
);

export async function generateSummaryFromGemini(pdfText:string) {
    try{
        const response = await client.models.generateContent({
            model : "gemini-2.0-flash",
            contents:`Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown format : \n\n${pdfText}`,
            config : {
                temperature:0.7,
                maxOutputTokens:1500,
                systemInstruction : SUMMARY_SYSTEM_PROMPT 
            }
        })
        
          if(!response){
            throw new Error("Empty response from Gemini API");
          }
          return response.text;
    }catch(err : any){
        throw err;
    }
  
}