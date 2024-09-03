import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white text-center h-max w-80 p-4 px-4">
                <Heading label={"Sign In"}/>
                <Subheading label={"Enter credentials your to login"}/>
                <Inputbox onChange={(e) => {
                    setUsername(e.target.value);
                }}
                label={"Username"} placeholder={"Enter username"}/>
                <Inputbox onChange={(e) => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"Enter password"}/>
                <div className="mt-4">
                    <Button onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3001/api/v1/user/signin", {
                  username,
                  password,        
                })
                const token = response.data.token
                localStorage.setItem("token", token);
                navigate("/dashboard");
              } catch(error) {
                console.log("Error during signup", error);
              }
            }} btnLabel={"Sign In"}/>
                </div>
                <BottomWarning  label={"Don't have an account"} btmWarLabel={"Signup"} to={"/signup"}/>
            </div>
        </div>

    </div>
}