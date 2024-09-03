
import axios from "axios";
import { useState } from "react";

export const Searchbar = () => {
    const [ users, setUsers ] = useState([]);
    return  <div>
        <div className=" py-3 ">
            <input onChange={async () => {
                const response = await axios.get("http://localhost:3001/api/v1/user/bulk");
                setUsers(response.data.user);
            }} className="border border-slate-200  px-3 py-1 rounded-lg w-full " type="text" placeholder="Search users . . ."/>
        </div>
    </div>
}