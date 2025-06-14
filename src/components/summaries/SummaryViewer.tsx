"use client";
import { Card} from "@/components/ui/card";
import { useState } from "react";
import { NavigationControls } from "./NavigationControls";
import { ProgressBar } from "./ProgressBar";
import { parseSection } from "@/utils/summaryHelper";
import ContentSection from "./ContentSection";
import { MotionDiv } from "../common/MotionWrapper";
const SectionTitle = ({title}:{title:string})=>{
    return(
        <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
                {title}
            </h2>
            
        </div>
    )
}
export function SummaryViewer({summary}:{summary:string}){
    console.log(summary);
    const [currentSection,setCurrentSection] = useState(0);
    const handleNext = ()=>setCurrentSection((prev)=>Math.min(prev+1,sections.length-1));
    const handlePrev = ()=>setCurrentSection((prev)=>Math.max(prev-1,0));
    const sections = summary.split("# ").map((section)=>section.trim()).filter(Boolean).map(parseSection);
    return(
        <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/20">
            {<ProgressBar sections={sections} currentSection={currentSection} />}
            <MotionDiv 
            key={currentSection} 
            initial={{opacity:0}} 
            whileInView={{opacity:1}}
            transition={{duration:0.5,ease :"easeInOut"}}
            exit={{opacity:0}}
            className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24"
            >
                <div className="px-4 sm:px-6">
                    <SectionTitle title={sections[currentSection]?.title || ""} />
                    <ContentSection title={sections[currentSection]?.title || ""} points={sections[currentSection]?.points || []} />
                </div>
            </MotionDiv>
                

                <NavigationControls currentSection={currentSection} totalSections={sections.length} onNext={handleNext} onPrevious={handlePrev} onSelectionSelect={setCurrentSection}/>{/*//go back and forth between sections */}
        </Card>

    )
}
