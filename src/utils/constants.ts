import { isDev } from "./helpers";

//isDev if true => is from sandbox
export const pricingPlans =[
    {
        id: "basic",
        name:"Basic",
        description : "Perfect for ocassional use",
        price : 9,
        items:[
            "5 PDF summaries per month",
            "Standard processing speed",
            "Email support"
        ],
        paymentLink: isDev?"https://buy.stripe.com/test_28o2az29Y0uX2NW145":"https://buy.stripe.com/test_9AQ7t6dmPaTq1HO5kl",
        priceId : isDev?"price_1R84LiSEtyXMV4IyyrLvojSI":"price_1R8YRbSHBgwHiesmOlbwR0k1",
    },
    {
        id: "pro",
        name:"Pro",
        description : "Perfect for ocassional use",
        price : 19,
        items:[
            "Unlimited PDF summaries",
            "Priority processing",
            "24/7 priority support",
            "Markdown Export"
        ],
        paymentLink: isDev?"https://buy.stripe.com/test_dR6cPd6qe1z1gEMdQQ":"https://buy.stripe.com/test_aEU3cQfuX8Libio288",
        priceId : isDev?"price_1R86QMSEtyXMV4IySkaTM2nu":"price_1R8YRbSHBgwHiesmzbJSGMPY",
    }
];

export const containerVariants = {
    hidden:{opacity : 0},
    visible:{
        opacity:1,
        transition :{
            staggerChildren : 0.2,
            delayChildren : 0.1 
        }
    }
}
export const itemsVariants = {
    hidden:{opacity : 0,y:20},
    visible:{
        opacity:1,
        transition :{
            type:"spring",
            damping:15,
            stiffness:50,
            duration : 0.8,
            staggerChildren : 0.2,
            delayChildren : 0.1 
        }
    }
}