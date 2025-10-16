import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

const signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signin`, {
                username, password
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                setUsername("");
                setPassword("");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMsg(error.response?.data?.msg || "SignIn Incomplete")
            } else {
                setMsg("An error occurred. Check your connection");
            }
        }
    }
}