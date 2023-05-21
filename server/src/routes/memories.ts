import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memorie = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memorie
  })

  app.post('/memories', async (request) => {
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
        userId: '5b42c958-b5d7-433a-a9cc-3b1531a1dae5',
      },
    })

    return memorie
  })

  app.put('/memories/:id', async (request) => {
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
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memorie = await prisma.memory.delete({
      where: {
        id,
      },
    })
    return { id: memorie.id }
  })
}
