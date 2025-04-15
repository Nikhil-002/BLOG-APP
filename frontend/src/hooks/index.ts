import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface BlogType {
    id : string,
    title: string,
    content: string,
    author: {
        name: string
    }
}


export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>()

    useEffect(()=>{
        console.log("Entered userEffect...........");
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization : localStorage.getItem("token")
                    }
                });
                console.log("after response..................");
                console.log(response.data);
    
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false); // You might still want to stop loading on error
            }
        }
        fetchBlogs();
    },[id])
    return { loading, blog };
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(()=>{
        console.log("Entered userEffect...........");
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization : localStorage.getItem("token")
                    }
                });
                console.log("after response..................");
                console.log(response.data);
    
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false); // You might still want to stop loading on error
            }
        }
        fetchBlogs();
    },[])
    console.log("in useBlogs: "+blogs);
    
    return { loading, blogs };
}