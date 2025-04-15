import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps {
    id : string
    authorName : string,
    title : string,
    content : string,
    publishedDate : string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
} : BlogCardProps) =>{
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b-2 border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer leading-relaxed text-justify">
                <div className="flex pb-1">
                        <Avatar name={authorName} />  
                    <div className="font-extralight pl-2 flex justify-center flex-col">
                        {authorName} 
                    </div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className="text-md ">
                    {content.length <= 100 ? content : content.slice(0,100) + "..." }
                </div>
                <div className="text-sm text-slate-500 font-thin pt-4">
                    {Math.ceil(content.length/100) + " min(s) read"}
                </div>
            </div>
        </Link>
    )
}

function Circle() {
    return(
        <div className="h-1 w-1 bg-slate-400 rounded-full">

        </div>
    )
}