import { type ReactElement } from "react";

interface ButtonProps {
    variant : "Primary" | "secondary" | "destructive";
    size : "xs" | "sm" | "md" | "lg" | "fit" | "full";
    text : string;
    startIcon?: ReactElement;
    onClick : any;
    disabled?: boolean;
}

const variantStyles = {
    "primary" : "bg-purple-600 hover:bg-purple-700 text-white",
    "secondary" : "bg-purple-200 hover: bg-purple-300 text-purple-300 text-purple-500 dark:bg-slate-700",
    "destructive": "bg-red-600 hover:bg-red-700 text-black"
}

const sizeStyle = {
    "xs" : "w-xs",
    "xm" : "w-xm"
}