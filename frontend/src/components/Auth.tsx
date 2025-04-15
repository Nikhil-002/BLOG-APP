import { SigninInput, SignupInput } from "@nikhilk9350/blog-app-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const Auth = ({type} : {type : "signup" | "signin"}) => {
    const[signupInputs,setSignupInputs] = useState<SignupInput>({
        email:"",
        password:"",
        name: ""
    })
    const[signinInputs, setSigninInputs] = useState<SigninInput>({
        email : "",
        password : ""
    })

    const navigate = useNavigate()

    async function sendRequest () {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                type === "signup" ? signupInputs : signinInputs)
            const jwt = response.data.jwt;
            // console.log("Full response:", response.data.jwt);
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate("/blogs")
            
        } catch (error) {
            console.log(error); 
        }
    }

    return(
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-bold">
                            {type === "signup" ? "Create an Account": "Sign In to Account"}
                        </div>
                        <div className="text-center text-slate-400">
                            {type === "signup" ? "Already have an account?": "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "signup" ? "/signin": "/signup"}>{type === "signup" ? "Login" : "Signup"}</Link>
                        </div>
                    </div>
                    <div className="pt-6">
                        {type === "signup" ?<LabelledInput label="Name" placeholder="John Doe" onChange={(e)=>{
                            setSignupInputs({
                                ...signupInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        {type === "signup" ? <LabelledInput label="Email" placeholder="John Doe" onChange={(e)=>{
                            setSignupInputs({
                                ...signupInputs,
                                email: e.target.value
                            })
                        }} /> : <LabelledInput label="Email" placeholder="John Doe" onChange={(e)=>{
                            setSigninInputs({
                                ...signinInputs,
                                email: e.target.value
                            })
                        }} />}
                        {type === "signup" ? <LabelledInput label="Password" type="password" placeholder="John Doe" onChange={(e)=>{
                            setSignupInputs({
                                ...signupInputs,
                                password: e.target.value
                            })
                        }} /> : <LabelledInput label="Password" type="password" placeholder="John Doe" onChange={(e)=>{
                            setSigninInputs({
                                ...signinInputs,
                                password: e.target.value
                            })
                        }} />}
                    </div>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" >{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput ({label,placeholder,onChange,type}: LabelledInputType) {
    return(
        <div>
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-3">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700" placeholder={placeholder} required />
        </div>
    )
}
