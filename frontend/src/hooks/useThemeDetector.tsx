import { useState, useEffect } from "react";

// Theme detector
const useThemeDetector = ()=>{
    const getCurrentTheme =  ()=> window.matchMedia("(prefer-color-theme : dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    
    const mqListener = ((e : any)=>{
        setIsDarkTheme(e.matches);
    });

    useEffect(()=>{
        const darkThemeMq = window.matchMedia("(prefer-color-theme: dark)");
        darkThemeMq.addEventListener("change", mqListener);
        return () => darkThemeMq.removeEventListener("change", mqListener);
    },[]);
    return isDarkTheme;
}

export default useThemeDetector;