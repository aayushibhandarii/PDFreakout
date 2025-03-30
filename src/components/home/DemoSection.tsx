import { Pizza } from "lucide-react"
import { MotionDiv, MotionH3 } from "../common/MotionWrapper"
import { itemsVariants } from "@/utils/constants"
import { SummaryViewer } from "../summaries/SummaryViewer"

const DEMO_SUMMARY = ``;
export default function DemoSection(){
    return(
        <section className="realtive">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border-gray-500/20 mb-4">
                        <Pizza className="w-6 h-6 text-rose-500"/>
                    </div>
                    <div className="text-center mb-16">
                        <MotionH3 initial={{y:20,opacity:0}} whileInView={{y:0, opacity:1}} 
                        transition={{duration:0.5,delay:0.2}}
                        className="font-bold text-3xl max-w-2xl max-auto px-4 sm:px-6">
                            Watch how PDFreakout transforms <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent"> this Next.js course PDF
                            </span> into an easy-to-read summary!
                        </MotionH3>
                    </div>
                    </div>   
                    <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
                        <MotionDiv initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5}}
                        >
                            <SummaryViewer summary={DEMO_SUMMARY}/>
                        </MotionDiv>
                    </div>
                
            </div>
        </section>
    )
}