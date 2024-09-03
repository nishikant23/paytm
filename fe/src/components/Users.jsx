import { useEffect, useState } from "react"
import { Searchbar } from "./Searchbar"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';


export const Users = () => {
    const [ users, setUsers ] = useState([]);
    const [ filter, setFilter ] = useState(""); 
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/user/bulk?filter="+filter)
            .then(response => {
                setUsers(response.data.user);
            })  
    },[filter]);
    return <div className="px-5 py-2">
         <div className="">
        <div className="px-11 py-4">
            <div className="font-bold  text-left">
                User
            </div>
            <div>
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} className="border border-slate-200  px-3 py-1 rounded-lg w-full " type="text" placeholder="Search users . . ."/>
            </div>
            <div>
                {users.map(user => <User user={user}/>)}
            </div>

        </div>
    </div>
    </div>
}


function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between pt-3">

        <div className="flex ">
            <div className=" w-10 h-10 bg-slate-300 rounded-full">
                <div className="flex flex-col justify-center items-center h-full font-bold text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="pl-3 pb-4 flex flex-col justify-center items-center h-full font-semibold text-xl">
                {user.firstName} {user.lastName}
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" +user.userId+"&name="+user.firstName);
            }} btnLabel={"Send Money"}/>
        </div>


    </div>
}