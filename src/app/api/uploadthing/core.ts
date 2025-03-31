import { metadata } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError} from "uploadthing/server";
import { createUploadthing , type FileRouter } from "uploadthing/next";

const f = createUploadthing();
export const ourFileRouter = { //responsible for uploading the files and interacting with uploadthing and giving us necessary details
    pdfUploader : f({pdf:{maxFileSize:"32MB"}})
    .middleware(
        async ({req})=>{
            //get user info
            const user = await currentUser();
            if(!user) throw new UploadThingError("Unauthorized") //if user not exist i.e. not signed in

            return {userId:user.id}
        }
    ).onUploadComplete(async({metadata,file})=>{ 
        //get called once upload get completed
        //metadata comes from middleware that get passed on to this
        console.log("Upload completed for usser id",metadata.userId);
        return {
            userId:metadata.userId,
            fileUrl : file.ufsUrl,
            fileName : file.name
        }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;