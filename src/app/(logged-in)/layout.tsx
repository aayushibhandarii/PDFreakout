//whenever a user is logged in but doesn't have active subscription then they'll see this

import UpgradeRequired from "@/components/common/UpgradeRequired";
import { getSubscriptionStatus, hasActivePlan } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({children} : {children : React.ReactNode}){
    const user = await currentUser();

    if(!user){
        redirect("/sign-in");
    }
    const hasActiveSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress);

    if(!hasActiveSubscription){
        return <UpgradeRequired />;
    }

    return <>{children}</>
}