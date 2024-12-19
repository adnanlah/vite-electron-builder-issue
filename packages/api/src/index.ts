import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import {nanoid} from 'nanoid'

export let server: FastifyInstance | null = null

export async function runServer(): Promise<void> {
  try {
    if (server) return

    server = fastify({
      maxParamLength: 5000,
    })

    server.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'http://127.0.0.1:3000', 'http://localhost:3000', 'ws://localhost:42877/']
        }
      }
    })

    server.register(cors, {
      origin: "*", // Reflect the request origin or set to a specific domain
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Adjust according to the methods your client uses
      allowedHeaders: ['Content-Type', 'Authorization', 'Client-Version'], // Include any custom headers you use
      credentials: true // If your client needs to send cookies
    })

    server.get('/random', (req, res) => {
      const r = nanoid()
      res.send(r)
    })

    await server.listen({ port: 3000 })

    console.log('Server is running on port 3000')
  } catch (err) {
    console.error(err)
    throw err
  }
}
