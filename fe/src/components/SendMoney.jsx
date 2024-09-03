import axios from "axios";
import { Heading } from "./Heading"
import { useSearchParams } from 'react-router-dom';
import { useState } from "react";

export const SendMoney = () => {
   const [ searchParams ] = useSearchParams();
   
   const id = searchParams.get('id');
   const name = searchParams.get('name');
   const [ amount, setAmount ] = useState(0); 
//    alert(searchBarParams.get('name'));
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="flex flex-col justify-center h-full">
            <div className="border bg-white h-min max-w-md p-4 space-y-8 rounded-lg shadow-lg">
                <div className="flex flex-col p-6 space-y-1.5">
                    <h2 className=" text-4xl font-bold">Send Money</h2>
                </div>
                <div >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl fontsemibold">{name}</h3>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
                                Amount (in Rs.)
                            </label>
                            <input 
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            type="number"
                            className="flex flex-col h-8 w-full border border-input bg-background rounded-md px-3 py-2"
                            id="amount"
                            placeholder="Enter amount . . ."
                            /> 
                       </div>
                        <button
                         onClick={ () => {
                             axios.post("http://localhost:3001/api/v1/account/transfer",{
                                to: id,
                                amount
                             }, {
                                headers : {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                             }
                            )
                         }}
                         className="ring-offset-background transition-colors rounded-md px-3 py-1 w-full justify-center bg-green-500 text-white font-medium">
                            Initiate Transfer
                        </button>
                    </div>    
                </div>
            </div>
        </div>
    </div>
}