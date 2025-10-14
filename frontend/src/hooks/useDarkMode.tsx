import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(()=>{
        if(localStorage.theme == "dark") return true;
        if(localStorage.theme == "light") return false;

        return window.matchMedia("(prefer-color-scheme: dark)").matches;
    });

    useEffect(()=>{
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.theme = isDarkMode ? "dark" : "light";
    },[isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    return [isDarkMode, toggleDarkMode]  as const;
}