export function formatFileNameAsTitle(fileName:string):string{
    //remove file extensions and replace special characters with space
    const withoutExtension = fileName.replace(/\.[^/.]+$/ ,' ');
    const withSpaces = withoutExtension.replace(/[-_]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
    // replace(/[-_]+/g, ' ') //repalce dashes and underscores with spaces
    // .replace(/([a-z])([A-Z])/g, '$1 $2');//add space between camelCase
    //convert to title case (capitalize first letter of each word)
    return withSpaces.split(" ").map((word)=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(" ").trim();
}