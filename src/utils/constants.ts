import { isDev } from "./helpers";

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
        paymentLink: isDev?"https://buy.stripe.com/test_28o2az29Y0uX2NW145":" ",
        priceId : process.env.NODE_ENV==="development"?"price_1R84LiSEtyXMV4IyyrLvojSI":" ",
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
        paymentLink: isDev?"https://buy.stripe.com/test_dR6cPd6qe1z1gEMdQQ":" ",
        priceId : process.env.NODE_ENV==="development"?"price_1R86QMSEtyXMV4IySkaTM2nu":" ",
    }
]