import { statusCodes } from "./constants/statusCodes";

export function generateRandomString(length: number){
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for(let i = 0; i<length; i++){
        result += char.charAt(Math.floor(Math.random() * char.length));
    }
    return result;
}

export function getYoutubeVideoId(url: string): string | null {
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

            //case 3: Embed link
            if(parsedUrl.pathname.startsWith("/embed/")) {
                return parsedUrl.pathname.split("/")[2] ?? null;
            }

            //case 4: Shorts link
            if(parsedUrl.pathname.startsWith("/shorts/")) {
                return parsedUrl.pathname.split("/")[2] ?? null;
            }

            // case 5 : Live link 
            if(parsedUrl.pathname.startsWith("/live/")) {
                return parsedUrl.pathname.split("/")[2] ?? null;
            }
        }

        return null;
    } catch(error){
       return null;
    }
}

export function extractTweet(url: string): string | null {
    try {

        const parsedUrl = new  URL(url);
        const segments = parsedUrl.pathname.split("/");

        const statusIndex = segments.findIndex(segments => segments=== "status");
        const tweetId = segments[statusIndex + 1];

        if(statusIndex !== -1 && tweetId && /^\d+$/.test(tweetId)){
            return tweetId;
        }

        return null;

    } catch(error) {
        return null;
    }
}