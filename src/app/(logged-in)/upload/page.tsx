import BgGradient from "@/components/common/BgGradient";
import { MotionDiv } from "@/components/common/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeader from "@/components/upload/UploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { containerVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page(){
    const user = await currentUser();

    if(!user?.id){
        redirect("/sign-in");
    }
    const userId = user.id;
    const email = user?.emailAddresses?.[0].emailAddress;
    const {hasReachedLimit} = await hasReachedUploadLimit({userId,email});

    if(hasReachedLimit){ //as if user has reached the limit then it can no longer go to /upload
        redirect("/dashboard");
    }
    return (
        <section className="min-h-screen">
            <BgGradient />
            <MotionDiv
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
            >
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <UploadHeader />
                    <UploadForm />
                </div>
                
            </MotionDiv>
        </section>
    )
}