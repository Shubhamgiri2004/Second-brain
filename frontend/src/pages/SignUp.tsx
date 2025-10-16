import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";


const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [setDarkMode, toggleDarkMode] = useDarkMode();

    //writing an event happen 
    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
            username, password
        });

        try {
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                setUsername("");
                setPassword("");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMsg(error.response?.data?.msg || "something went wrong");
            } else {
                setMsg("Network error. Please refresh again.")
            }
        }
    }


}

export default SignUp;
