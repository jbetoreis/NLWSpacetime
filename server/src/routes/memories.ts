import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const sign_user = request.user as { sub: string }
    const memories = await prisma.memory.findMany({
      where: {
        userId: sign_user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        content: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const sign_user = request.user as { sub: string }

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memorie = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (sign_user.sub === memorie.userId || memorie.isPublic) {
      return memorie
    } else {
      return reply.status(401).send()
    }
  })

  app.post('/memories', async (request) => {
    const sign_user = request.user as { sub: string }

    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memorie = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: sign_user.sub,
      },
    })

    return memorie
  })

  app.put('/memories/:id', async (request, reply) => {
    const sign_user = request.user as { sub: string }

    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (sign_user.sub === memory.userId) {
      const memorie = await prisma.memory.update({
        where: {
          id,
        },
        data: {
          content,
          isPublic,
          coverUrl,
        },
      })

      return memorie
    } else {
      return reply.status(401).send()
    }
  })

  app.delete('/memories/:id', async (request, reply) => {
    const sign_user = request.user as { sub: string }

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (sign_user.sub === memory.userId) {
      const memorie = await prisma.memory.delete({
        where: {
          id,
        },
      })
      return { id: memorie.id }
    } else {
      return reply.status(401).send()
    }
  })
}
