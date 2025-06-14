"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const handlePricingClick = ()=>{
            const pricingSection = document.getElementById("pricing");
            if(pricingSection){
                pricingSection.scrollIntoView({behavior : "smooth"});
            }
}
export default function MoveToPricing (){
    
    return(
        <div className="transition-colors text-sm duration-200 text-gray-900 hover:text-rose-500 cursor-pointer" onClick={handlePricingClick}>Pricing</div>
    )
}
export const MoveToPricingButton = ()=>{
    return(
        <Button                                
            size="lg" variant={"outline"} className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
            onClick={handlePricingClick}
        >
            Get Started{" "}
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
        </Button>
    )
}
