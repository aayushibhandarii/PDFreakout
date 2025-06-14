import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export const findPricingPlan = async ()=>{
    const user = await currentUser();
    if(!user?.id){
        return null;
    }
    const email = user?.emailAddresses?.[0].emailAddress;
    let priceId : string|null = null;
    if(email){
        priceId = await getPriceIdForActiveUser(email);
    }
    let planName = "Buy a plan";
    const plan = pricingPlans.find((plan)=>plan.priceId === priceId);
    if(plan){
        planName = plan.name;
    }
    return planName;
}
export default async function PlanBadge(){
    
    let planName = await findPricingPlan();
    return (
        <Badge 
        variant={"outline"}
        className={cn("ml-2 bg-linear-to-r from-amber-100 to-amber-200 to-amber-300 hidden lg:flex flex-row items-center",(planName=="Buy a plan") && "from-red-100 to-red-200 border-red-300")}
        >
            <Crown className={cn("w-3 h-3 mr-1 text-amber-600",(planName=="Buy a plan") && "text-red-600")} />
            {planName}
        </Badge>
    )
}