// import express, { Request, Response, NextFunction } from 'express'
// import { DatabaseError } from '../../errors'

// const checkUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const prisma = req.app.get('prisma')
//     const { email } = req.body
//     console.log(email)
//     const userExists = await prisma.user.findUnique({
//       where: { email },
//     })
//     req.userExists = !!userExists
//   } catch (error) {
//     next(error)
//   }
// }

// const userRoutes = express.Router()

// userRoutes.get(`/`, async (req: Request, res: Response) => {
//   const prisma = req.app.get('prisma')
//   const users = await prisma.user.findMany({})
//   res.json(users)
// })

// userRoutes.post(
//   `/`,
//   checkUserExistsMiddleware,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const prisma = req.app.get('prisma')
//       if (req.userExists) {
//         throw new DatabaseError({ endpoint: req.endpoint, message: 'user exist' })
//       }
//       const result = await prisma.user.create({
//         data: req.body,
//       })
//       res.json(result)
//     } catch (error) {
//       console.log({ error })
//       next(error)
//     }
//   }
// )

// userRoutes.put('/', async (req: Request, res: Response) => {
//   const { id }: { id?: string } = req.params
//   const prisma = req.app.get('prisma')
//   if (req.userExists) {
//     throw new DatabaseError({ endpoint: req.endpoint, message: 'user exist' })
//   }
//   const user = await prisma.user.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   })
//   res.json(user)
// })

// userRoutes.delete(`/`, async (req: Request, res: Response) => {
//   const { id }: { id?: string } = req.params
//   const prisma = req.app.get('prisma')
//   if (req.userExists) {
//     throw new DatabaseError({ endpoint: req.endpoint, message: 'user exist' })
//   }
//   const user = await prisma.user.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(user)
// })

// export default userRoutes
