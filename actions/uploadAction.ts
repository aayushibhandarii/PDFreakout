"use server";
import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
        console.log(pdfText,"\n\n")
        let summary;
        try{
            summary = await generateSummaryFromOpenAI(pdfText);
            console.log(summary);
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
        const formattedFileName = formatFileNameAsTitle(fileName);
        return {
            success:true,
            message : "Summary generated successfully",
            data : {
                title:formattedFileName,
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

async function savePdfSummary({userId,fileUrl,summary,title,fileName}:{userId:string,fileUrl:string,summary:string,title:string,fileName:string}){
    //sql inserting pdf summary
    try{
        const sql = await getDbConnection();
        const [savedSummary] = await sql`INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
        ) VALUES (
            ${userId},
            ${fileUrl},
            ${summary},
            ${title},
            ${fileName}
        ) RETURNING id, summary_text
        `;
        return savedSummary;

    }catch(error){
        console.error("Error saving PDF summary",error);
        throw error;
    }
}

export async function storePdfSummaryAction({fileUrl,summary,title,fileName}:{fileUrl:string,summary:string,title:string,fileName:string}){
    //user is logged in and has a useerid
    //savePDFSummary => require function savePDFSummary()
    let savedPdfSummary:any;
    try{
        const { userId} = await auth(); //getting userid from clerk
        if(!userId){ //if user not exist
            return{
                success : false,
                message : "User not found",
                data :  null 
            }
        }
        savedPdfSummary = await savePdfSummary({userId,fileUrl,summary,title,fileName});
        if(!savedPdfSummary){
            return{
                success : false,
                message : "Failed to save PDF summary",
                data :  null 
            }
        }
    }catch(error){
        return{
            success : false,
            message : error instanceof Error ? error.message:"Error saving PDF Summary",
            data :  null 
        }
    }
    //revalidate the cache
    revalidatePath(`/summaries/${savedPdfSummary.id}`) // we have to create a individual summary page
    return{
        success : true,
        message : "PDF summary saved successfully",
        data :  {
            id:savedPdfSummary.id,
        } 
    }
}


