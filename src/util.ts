import { statusCodes } from "./constants/statusCodes";

export function generateRandomString(length: number){
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for(let i = 0; i<length; i++){
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
}

function getYoutubeVideoId(ur: string): string | null {
    if(!url.includes("youtu")) return null;
    try{
        const parsedUrl = new URL(url);

        //for short url
        if(parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.slice(1); 
        }

        // standard watch link
        if(parsedUrl.hostname.includes("youtube.com")){
            const vParam = parsedUrl.searchParams.get("v");
            if(vParam) return vParam;
            
            return parsedUrl.pathname.s
        }

    } catch(error){
       return null;
    }
}