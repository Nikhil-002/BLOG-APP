import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// import { PrismaClient } from '@prisma/client/extension'
import { jwt, sign } from 'hono/jwt'
import { jwk } from 'hono/jwk'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter)


export default app
