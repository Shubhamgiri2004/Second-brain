import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";



function ShareBrain(){
    const { shareId } = useParams();
    const [ username, setUsername] = useState("");
    const [ type, setType ] = useState("");
    const [ isDarkMode, toggleDarkMode ] = useDarkMode();

    const fetchContent = async() : Promise<ContentType[]> => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/brain/${shareId}`);
        if(response.status === 2000) {
            setUsername(response.data.username);
            return response.data.content;
        } else {
            throw new Error(response.data);
        }
    }

    const { data } = useQuery({
        queryKey: ["sharedContent"],
        queryFn: fetchContent,
    });

    return(
        <>
        {/* <div className="flex dark:bg-slate-900 dark:text-slate-100">
            <Sidebar setType={setType}/>
            <div className="absolute top-4 right-4">
                <button onClick={toggleDarkMode}
                className="p-2 rounded-full bg-purple-600 text-white shadow-md">
                    {isDarkMode ? <Sun size ={18}/> : <Moon size={18}/>}
                </button>
            </div>
        </div> */}
        </>
    )
}