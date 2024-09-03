import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


export const Logout = () => {
    const navigate = useNavigate();
    const handle =  () => {
        localStorage.removeItem('token');
        // alert("Token Cleared")
        navigate("/signin")
    }
   
    return <div>
        <button onClick={handle} className="rounded-md text-md font-md px-2 py-1 border border-slate-500 hover:bg-slate-300 ">Logout</button>
        
    </div>
}