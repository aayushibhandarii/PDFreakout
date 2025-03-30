import { parseEmojiPoint, parsePoint } from "@/utils/summaryHelper";

const EmojiPoint = ({point}:{point:string;})=>{
    const {emoji, text} = parseEmojiPoint(point)??{};
    return (
        <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
            <div className="flex items-start gap-3">
                <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">{text}</p>
            </div>
            </div> 
    )
}
const RegularPoint = ({point}:{point:string;})=>{
    return (
        <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
                <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">{point}</p>
            </div>
    )
}
export default function ContentSection({
    title,
    points,
}:{
    title : string;
    points : string[];
}){

    console.log(points);
    return(
        <div className="space-y-4">
            {
                points.map((point,index)=>{
                    const {isMainPoint,hasEmoji,isEmpty} = parsePoint(point);
                    if(isEmpty) return null;

                    if(hasEmoji || isMainPoint){
                        return <EmojiPoint point={point} key={index} />
                    }
                    return <RegularPoint point={point} key={index} />
                    
                })
            }
        </div>
    )
}