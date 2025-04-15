import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
import { signinInput, signupInput } from "@nikhilk9350/blog-app-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}
>()

userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    console.log("check1");
    console.log(body);
    
    const result = signupInput.safeParse(body);
    console.log(result);
    
    if(!result.success) {
        c.status(411)
        return c.json({
            message : "Inputs not correct",
            error: result.error.format(), // 
        })
    }
    console.log("check2");
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      console.log("check 2");
      
      const user = await prisma.user.create({
      data : {
        email: body.email,
        name: body.name,
        password: body.password
      }     
      });
      console.log("check 3");
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    }
    catch(e) {
      c.status(400)
      return c.json({error : "User already exist with this Email"})
    }
    return c.text('SignUp')
  })
  
  
  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success) {
        c.status(411)
        return c.json({
            message : "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
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