import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}
>()

userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    try{
      const user = await prisma.user.create({
      data : {
        email: body.email,
        name: body.name,
        password: body.password
      }     
      });
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    }
    catch(e) {
      c.status(400)
      return c.json({error : "User already exist with this Email"})
    }
    return c.text('SignUp')
  })
  
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where:{
        email : body.email
      }
    });
    if(!user){
      c.status(403)
      return c.json({error : "User not found"})
    }
    const jwt = await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt})
  })