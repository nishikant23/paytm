import axios from "axios"
import { useEffect, useState } from "react"

export  const Balance = () => {
    const [ bal, setBal ] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/account/balance",{
            headers : {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setBal(parseFloat(response.data.balance).toFixed(2)) //till 2 decimal plce only
            })
    },[])
    return  <div className="px-5 py-2">
        <div className="flex border rounded-lg px-11 py-2 ">
        
        <div className="font-bold text-lg text-left ">
        Your balance is 
        </div> 
        <div className="font-bold text-md text-left pl-2 ">
        {bal !== null ? `$${bal}` : 'N/A'}
        </div>
    </div>
    </div>
}