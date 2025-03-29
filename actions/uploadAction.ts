"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ClientUploadedFileData } from "uploadthing/types";

export async function generatePdfSummary(uploadResponse : [{
    serverData : {
        userId : string;
        file :{
            ufsUrl:string;
            name:string;
        }
    }
}]){
    
    if(!uploadResponse){
        return{
            success : false,
            message : "File upload failed",
            data :  null 
        }
    }
     const {
        serverData :{
            userId,
            file : {ufsUrl:pdfUrl,name:fileName}
        }
     } = uploadResponse[0];
    if(!pdfUrl){
        return{
            success : false,
            message : "File upload failed",
            data :  null 
        }
    }
    try{
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(pdfText)
        let summary;
        try{
            summary = await generateSummaryFromOpenAI(pdfText);
        }catch(error){
            //here we'll call gemini if summary can't be created using gemini
            try{
                summary = await generateSummaryFromGemini(pdfText)
            }catch(err){
                console.log(err);
                throw new Error("Failed to generate summary with the available ai providers")
            }
        }
        if(!summary){
            return{
                success : false,
                message : "Failed to generate summary",
                data :  null 
            }
        }
        return {
            success:true,
            message : "Summary generated successfully",
            data : {
                summary
            }
        }

    }catch(err){
        return{
            success : false,
            message : "File upload failed",
            data :  null 
        }
    }
}