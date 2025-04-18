import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/index"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return(
        <div>
            Loading....
        </div>)
    }
    console.log(blogs)
    return(
        
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    
                { blogs?.map(blog => <BlogCard
                        id = {blog.id}
                        authorName = {blog.author?.name || "Anonymous"}
                        title = {blog.title}
                        content = {blog.content}
                        publishedDate = {"Aug 30, 2024"}
                    />)}
                </div>

                </div>
            </div>
    )
}