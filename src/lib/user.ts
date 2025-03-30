import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

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
    const uploadLimit:number = isPro ? 1000:5;

    return {hasReachedLimit: uploadCount>=uploadLimit,uploadLimit};
}

export async function hasActivePlan(email : string){
    const sql = await getDbConnection();
    const query = await sql`SELECT price_id,status FROM users where email = ${email} AND status=${"active"} AND price_id is NOT NULL`;
    return query && query.length > 0; //means that they have active plans
}

export async function getSubscriptionStatus(user : User){
    const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress);

    return hasSubscription
}

