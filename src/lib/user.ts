import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getPriceIdForActiveUser(email:string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id FROM users where email = ${email} AND status=${"active"}`;
    return query?.[0]?.price_id || null;

}

export async function hasReachedUploadLimit({userId ,email}:{
    userId:string,
    email : string
}){
    const uploadCount = await getUserUploadCount(userId);
    const priceId = await getPriceIdForActiveUser(email);
    const isPro = pricingPlans.find((plan)=>plan.priceId === priceId)?.id === "pro";
    const uploadLimit:number = isPro ? 2:5;

    return {hasReachedLimit: uploadCount>=uploadLimit,uploadLimit};
}