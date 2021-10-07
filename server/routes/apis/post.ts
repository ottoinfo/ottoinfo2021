import express, { Request, Response, NextFunction } from 'express'

import { ApiError } from '../../errors'

const postRoutes = express.Router()

postRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id }: { id?: string } = req.params
  const prisma = req.app.get('prisma')
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

postRoutes.get(`/`, async (req: Request, res: Response) => {
  const prisma = req.app.get('prisma')
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(posts)
})

postRoutes.post(`/`, async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body
  const prisma = req.app.get('prisma')
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

export default postRoutes
