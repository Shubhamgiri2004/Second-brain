import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const SignUp = () =>{
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [isDarkMode, toggleDarkMode]  = useDarkMode("");

    

}