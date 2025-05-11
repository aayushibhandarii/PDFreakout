export const parseSection = (section:string,index:number):{title:string;points:string[]}=>{
    if(index==0 && section.split("#").length >1){
        section = section.split("#")[1];
    }
    const [title, ...content] = section.split("\n\n");
    const cleanTitle = title.startsWith("#") ? title.substring(1).trim():title.trim();
    const points: string[] =[];
    let currentPoint = '';
    const emojiRegex = /[\p{Emoji_Presentation}|\p{Emoji}\u200D]+/gu;

    content.forEach((line)=>{
        console.log(line);
        line = line.replace(/(?<!\*)\*(?!\*)/g, "•");
        const trimmedLine = line.trim();
        if(trimmedLine.startsWith("•")){
            if (currentPoint) {
                // Split the current point by emojis, preserving the emojis
                let parts: string[] = [];
                let lastIndex = 0;
                let match;

                // Reset emojiRegex to avoid issues with global flag
                emojiRegex.lastIndex = 0;

                while ((match = emojiRegex.exec(currentPoint)) !== null) {
                    const emoji = match[0];
                    const index = match.index;

                    // Add the text before the emoji (if any)
                    if (index > lastIndex) {
                        parts.push(currentPoint.slice(lastIndex, index));
                    }

                    // Add the emoji itself
                    parts.push(emoji);

                    lastIndex = index + emoji.length;
                }

                // Add the remaining text after the last emoji (if any)
                if (lastIndex < currentPoint.length) {
                    parts.push(currentPoint.slice(lastIndex));
                }

                // Join the parts back together (preserving emojis) and push to points
                const formattedPoint = parts.join('');
                points.push(formattedPoint.trim());
            }
            currentPoint = trimmedLine;
        }else if(!trimmedLine){
            if (currentPoint) {
                // Split the current point by emojis, preserving the emojis
                let parts: string[] = [];
                let lastIndex = 0;
                let match;

                emojiRegex.lastIndex = 0;

                while ((match = emojiRegex.exec(currentPoint)) !== null) {
                    const emoji = match[0];
                    const index = match.index;

                    if (index > lastIndex) {
                        parts.push(currentPoint.slice(lastIndex, index));
                    }

                    parts.push(emoji);

                    lastIndex = index + emoji.length;
                }

                if (lastIndex < currentPoint.length) {
                    parts.push(currentPoint.slice(lastIndex));
                }

                const formattedPoint = parts.join('');
                points.push(formattedPoint.trim());
            }
            currentPoint = '';
        }else{
            currentPoint+=' '+trimmedLine;
        }
    })
    if (currentPoint) {
        // Split the current point by emojis, preserving the emojis
        let parts: string[] = [];
        let lastIndex = 0;
        let match;

        emojiRegex.lastIndex = 0;

        while ((match = emojiRegex.exec(currentPoint)) !== null) {
            const emoji = match[0];
            const index = match.index;

            if (index > lastIndex) {
                parts.push(currentPoint.slice(lastIndex, index));
            }

            parts.push(emoji);

            lastIndex = index + emoji.length;
        }

        if (lastIndex < currentPoint.length) {
            parts.push(currentPoint.slice(lastIndex));
        }

        const formattedPoint = parts.join('');
        points.push(formattedPoint.trim());
    }
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