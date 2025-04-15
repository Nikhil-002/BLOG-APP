import { BlogType } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Avatar"

export const FullBlog = ({blog} : {blog : BlogType}) => {
    return (
        <div>
            <Appbar />
                <div className="flex justify-center py-10">
                <div className="grid grid-cols-12 px-10 w-full">
                    <div className="col-span-8 max-w-4xl px-5 text-justify">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="pt-5 text-md">
                            {blog.content}  
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg pb-2">
                            Author
                        </div>
                        <div className="flex">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar name="Author" /> 
                            </div>
                            <div>
                                <div className="text-xl font-extrabold">
                                    {blog.author?.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random's catch phrase of the user ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}