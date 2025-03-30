export const parseSection = (section:string,index:number):{title:string;points:string[]}=>{
    if(index==0 && section.split("#").length >1){
        section = section.split("#")[1];
    }
    const [title, ...content] = section.split("\n\n");
    const cleanTitle = title.startsWith("#") ? title.substring(1).trim():title.trim();
    const points: string[] =[];
    let currentPoint = '';
    content.forEach((line)=>{
        console.log(line);
        line = line.replace(/(?<!\*)\*(?!\*)/g, "•");
        const trimmedLine = line.trim();
        if(trimmedLine.startsWith("•")){
            if(currentPoint) points.push(currentPoint.trim());
            currentPoint = trimmedLine;
        }else if(!trimmedLine){
            if(currentPoint) points.push(currentPoint.trim());
            currentPoint = '';
        }else{
            currentPoint+=' '+trimmedLine;
        }
    })
    if(currentPoint) points.push(currentPoint.trim());
    return {title:cleanTitle,points:points.filter(
        (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    )};
}
export function parsePoint(point:string){
    const isNumbered = /^\d+\./.test(point); //check if it is a number
    const isMainPoint = /^•/.test(point); // check if it is a main point

    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u; 
    const hasEmoji = emojiRegex.test(point);// if it has emoji
    const isEmpty = !point.trim(); //if it empty

    return {isNumbered,isMainPoint,hasEmoji,isEmpty};
}
export function parseEmojiPoint(content: string){
    const cleanContent = content.replace(/^[•]\s*/, '').trim();
    const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
    if(!matches) return null;

    const [_,emoji, text] = matches;
    return {
        emoji : emoji.trim(),
        text : text.trim(),
    }
}