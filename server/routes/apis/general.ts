import express, { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../errors'

const apiRoutes = express.Router()

apiRoutes.param('id', (req: Request, res: Response, next: NextFunction, id: string) => {
  // Throw error if ID is NOT a NUMBER
  if (isNaN(Number(id))) {
    throw new ApiError({ endpoint: req.endpoint })
  }
  next()
})

apiRoutes.get('/test', async (req: Request, res: Response) =>
  res.json({ payload: { dummy: 'data' }, success: true })
)

apiRoutes.get('/fail', async (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Basic Error'))
})

export default apiRoutes
