"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import {z} from "zod"
import { toast } from "sonner";
import {generatePdfSummary, storePdfSummaryAction} from "../../../actions/uploadAction";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
const schema = z.object({
    file:z.instanceof(File,{message:"Invalid File"})
    .refine((file)=>file.size<=24*1024*1024, "File size must be less than 24MP")
    .refine((file)=>file.type.startsWith("application/pdf"),"File must be pdf")
    //incase of instanceof we need message object but in case of refine we may or may not write message object 
})
export default function UploadForm(){
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter();
    const {startUpload,routeConfig} = useUploadThing( //startUpload is the function for start uploading
        "pdfUploader",{ //this pdfUploader name should match what we created inside core.tsx

        onClientUploadComplete:()=>{
            console.log("Uploaded successfully!");
        },
        onUploadError :(err)=>{
            toast.message(
                "Error occurred while uploading",
                {
                    description : err.message,
                }
            )
        },
        onUploadBegin : ()=>{
            console.log("Upload has begun for");
        }

    })
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault(); //Not refresh the page on hit submit
        setIsLoading(true);
        try{
            const  formData = new FormData(e.currentTarget);
            const file = formData.get("file") as File;
            
            //validating the fields=>done by using schema with zod
            const validatedFields = schema.safeParse({file}) //=>gives us success property and ccheck if success property is not true then give message
            console.log(validatedFields)
            if(!validatedFields.success){
                    // validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file" //the error zod has given
                toast.warning(
                    '❌ something went wrong',
                    {
                        description : validatedFields.error.flatten
                    ().fieldErrors.file?.[0] ?? "Invalid file"
                    }
                )// error if something wrong with the file
                setIsLoading(false);
                return; //returning as we don't want the user to proceed further
            }
            toast.message("📄 Uploading PDF...",{
                description:"We are uploading your PDF!!"
            })
            //once schema validation is done 
            // then we'll upload the file to upload thing
            const resp = await startUpload([file])
            if(!resp){
                toast.warning(
                    '❌ something went wrong',
                    {
                        description : "Please use a different file"
                    }
                )//if the file has uploaded but still something goes wrong then this error is shown
                setIsLoading(false);
                return;
            }
            toast.message("📄 Processing PDF...",{
                description:"Hang tight! Our AI is reading through your document! ✨"
            })
            //once the file has been uploaded => parse the pdf using langchain 
            //then summarize the pdf using AI
            const result = await generatePdfSummary(resp); 
    
            const {data = null,message=null} = result||null;
            console.log(data);
            if(data){
                let storeResult : any;
                toast.message("📄 Saving PDF...",{
                    description:"Hang tight! we are saving your summary! ✨"
                })
                
                if(data.summary){
                    storeResult = await storePdfSummaryAction({
                        fileUrl : resp[0].serverData.file.url,
                        summary : data.summary,
                        title : data.title,
                        fileName : file.name,
                    });
                    //save the summary to the database
                    toast.message("✨ Summary Generated!",{
                        description:"Your PDF has been successfully summarized and saved! ✨",
                    });
                    formRef.current?.reset(); // resetting the form
                    router.push(`summaries/${storeResult.data.id}`);
                }
                
            }
            //redirect to the [id] summary page
        }catch(err){
            setIsLoading(false);
            console.error("Error occurred",err);
            formRef.current?.reset(); // reset the form(Upload Form) if any of the error occurred
        }finally{
            setIsLoading(false);
        }

         
    }
    return(
        <div className="flex flex-col gap-8 w-full ma-w-2xl mx-auto">
            <UploadFormInput isLoading= {isLoading} ref={formRef} onSubmit={handleSubmit}/>
        </div>
    )
}