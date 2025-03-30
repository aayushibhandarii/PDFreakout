"use client"    //as we needed a handler.... as it is client component hence it'll be included in our browser bundle
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { startTransition, useTransition } from "react"; // let us render a part of the UI in the background... like if we're deleting a summary then we won't block the whole app
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { useState } from "react";
import {deleteSummaryAction} from "@/../actions/summaryAction"
import { toast } from "sonner";

export default function DeleteButton({summaryId}:{summaryId:string}){
    const [open,setOpen] = useState(false);
    const [isPending,startTransition] = useTransition();
    const handleDelete = async()=>{
        startTransition(async()=>{
            //delete the summary => await deleteSummary(summaryId)
            const result = await deleteSummaryAction({summaryId});
            if(!result.success){ //if it is not successful
                toast.error("Error",{
                    description:"Failed tp delete the summary!!"
                })
            }
            setOpen(false);
        })
    }
    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{/* dialog trigger is actually the trigger*/} 
                <Button 
                variant={"ghost"}
                size="icon"
                className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
                >
                    <Trash2 className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>{/* dialog content is the content that is shown once pressed the dialog trigger*/} 
                <DialogHeader>
                <DialogTitle>Delete Summary</DialogTitle>
                <DialogDescription>
                    Are you  sure you want to delete the summary? This action cannot be undone.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                    variant="ghost"
                    className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
                    onClick={()=>setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button 
                    variant="destructive"
                    className=" bg-gray-900 border hover:bg-gray-600"
                    onClick={handleDelete}
                    >
                        {isPending ? "Deleting...":"Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        
    )
}