import fastify from 'fastify'
import 'dotenv/config'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'df5o68wg6w5hq78e0ruhidgtysbog9uw5erbnhyiu6wyiv',
})

app.register(authRoutes)

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server Running on http://localhost:3333')
  })
