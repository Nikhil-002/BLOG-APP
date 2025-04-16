import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle]  = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full">
                <div className="max-w-screen-lg w-full my-5">
                    <input onChange={(e)=>{
                        setTitle(e.target.value)
                    }} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-2" placeholder="Your Title here..." />
                    <textarea onChange={(e) => {
                        setContent(e.target.value)
                    }} id="message" rows={10} className=" focus: outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write your blog here..."></textarea>  
                    <div className="flex justify-center">
                    {(title === "" || content === "") ? 
                    <button type="submit" className="cursor-not-allowed
 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 mt-2">

                    Publish post
                    </button>
                     :
                    <button onClick={async() =>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        },{
                            headers : {
                                Authorization : localStorage.getItem("token")
                            }
                        })
                        console.log(response.data.id);
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="cursor-pointer inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 mt-2">

                    Publish post
                    </button>    }
                    </div>  
                </div>
            </div>
        </div>
    )
}