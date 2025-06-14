import { ReactNode } from "react"
import { FileText,BrainCircuit,FileOutput, MoveRight } from "lucide-react"
import { MotionDiv, MotionH2, MotionH3 } from "../common/MotionWrapper"
type Step = {
    icon : ReactNode,
    label:string,
    description : string
}
const steps:Step[] =[
    {
        icon:<FileText size={64} strokeWidth={1.5} />,
        label:"Upload PDF",
        description:"Simply drag and drop your PDF documnet or click to upload"
    },
    {
        icon:<BrainCircuit size={64} strokeWidth={1.5} />,
        label:"AI Analysis",
        description:"Our advance AI processes and analyzes your document instantly"
    },
    {
        icon:<FileOutput size={64} strokeWidth={1.5} />,
        label:"Get Summary",
        description:"Receive a clear, concise summary of your document"
    }
]
export default function HowItWorksSection(){
    return(
        <section className="realtive overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="text-center mb-16 ">
                    <MotionH2 
                        initial={{opacity:0,y:20}} 
                        whileInView={{opacity:1,y:0}}
                        transition={{duration:0.5}}
                        className="font-bold text-xl mb-4 text-rose-500"
                    >
                        HOW IT WORKS
                    </MotionH2>
                    <MotionH3 
                    initial={{opacity:0,y:20}} 
                    whileInView={{opacity:1,y:0}}
                    transition={{duration:0.5,delay:0.2}}
                    className="font-bold text-3xl max-w-2xl mx-auto"
                    >
                        Transform any PDF into an easy-to-digest summary in three single steps
                    </MotionH3>
                </div>
                <div className="flex flex-col items-center md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                    {
                        steps.map((step,index)=>(
                            <MotionDiv 
                                initial={{opacity:0,y:50}} 
                                whileInView={{opacity:1,y:0}}
                                transition={{duration:0.5,delay:index*0.2}}
                                
                                className="relative flex items-stretch" 
                                key={index}
                            >
                                <div className="relative flex items-stretch">
                                    <StepItem {...step} />
                                    {
                                        index < steps.length-1 &&
                                        ( 
                                        <MotionDiv
                                         initial={{opacity:0}} 
                                         whileInView={{opacity:1}}
                                         transition={{duration:0.5,delay:index*0.2+0.3}}
                                         className="hidden absolute md:block top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <MoveRight size={32} strokeWidth={1} className="text-rose-400" />
                                        </MotionDiv>
                                        )
                                    }
                                </div>
                            </MotionDiv>
                            
                            
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

function StepItem({icon,label,description}:Step){
    return (
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors froup w-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10  to-transparent group-hover:from-rose-500/20 transition-colors">
                    <div className="text-rose-500">{icon}</div>
                </div>
                <div className="flex flex-col flex-1 gap-1 justify-between">
                    <h4 className="text-center font-bold text-xl ">{label}</h4>
                    <p className="text-center text-gray-600 text-sm">{description}</p>
                </div>
            </div>
            

        </div>
    )
}