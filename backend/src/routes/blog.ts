import { createBlogInput } from '@nikhilk9350/blog-app-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables:{
        userId : string
    }
}>()


blogRouter.use("/*",async(c,next) => {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET)
    try{
        if(user) {
            c.set("userId",String(user.id))
            await next();
        }
        else {
            return c.status(403)
            return c.json({message: "You are not logged in"})
        }
    }
    catch(e){
        c.status(403)
        return c.json({message: "You are not logged in"})
    }
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411)
        return c.json({
            message : "Inputs not correct"
        })
    }

    const prisma  = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const authorId = c.get("userId")
    const blog = await prisma.post.create({
        data: {
            title : body.title,
            content : body.content,
            authorId : String(authorId)
        }
    })

    return c.json({
        id : blog.id
    })
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411)
        return c.json({
            message : "Inputs not correct"
        })
    }
    
    const prisma  = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where:{
            id : body.id,
        },
        data :{
            title : body.title,
            content : body.content
        }
    })
    return c.text('Updated Post')
})

blogRouter.get('/bulk', async(c) => {
    const prisma  = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.findMany({})
    return c.json(post)
})
  
blogRouter.get('/:id', async(c) => {
    const prisma  = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")  
    const post = await prisma.post.findUnique({
        where: {
            id : String(id),
        }
    })
    return c.json(post)
})