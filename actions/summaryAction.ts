"use server"
import { getDbConnection } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

  //anytime we have to do any sort of operation that allows to update or delete

export async function deleteSummaryAction({summaryId}:{summaryId:string}){
    try{
        const user = await currentUser();
        const userId = user?.id;
        if(!userId){
            throw new Error("User not found");
        }
        const sql = await getDbConnection();

        //delete from the database
        const result = await sql`
        DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id=${userId} RETURNING id;
        `
        //call revalidatePath => which will delete it from the nextjs cache as well
        if(result.length>0){
            revalidatePath("/dashboard");
            return {success:true};
        }
        return {success : false};
    }catch(err){
        console.error("Error deleting the summary",err);
        return {success : false};
    }
}