import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import PropTypes from 'prop-types'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <Subheading label={"Enter your details to create an account"} />
          <Inputbox onChange={(e) => {
            setFirstName(e.target.value);
          }} label={"First Name"} placeholder={"Enter first name"} />
          <Inputbox onChange={(e) => {
            setLastName(e.target.value);
          }} label={"Last Name"} placeholder={"Enter last name"} />
          <Inputbox onChange={(e) => {
            setUsername(e.target.value);
          }} label={"Username"} placeholder={"Enter username"} />
          <Inputbox onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Enter password"} />
          <div className="mt-4">
            <Button onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
                  username,
                  password,
                  firstName,
                  lastName
                  
                })
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch(error) {
                console.log("Error during signup", error);
              }
            }} btnLabel={"Sign Up"} />
          </div>
          <BottomWarning label={"Already have an account?"} btmWarLabel={"Signin"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
