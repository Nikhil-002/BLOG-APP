import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
export const Appbar = () => {
    return (
        <div className="flex justify-between px-10 py-2 border-b slate-400 text-xl">
            <Link to={'/blogs'} className="font-extrabold text-rose-800 flex flex-col justify-center text-2xl">
                Medium
            </Link>
            <div className="flex flex-col justify-center">
                <div>
                <Link to={'/publish'}>
                    <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10">New Blog</button>
                </Link>
                <Avatar name={"Nikhil"} />
                </div>
            </div>
        </div>
    )
}