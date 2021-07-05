import express, { Request, Response, NextFunction } from 'express'
import { ApiError, UnknownAPIError } from '../errors'

const apiRoutes = express.Router()

apiRoutes.param('id', (req, res, next, id) => {
  // Throw error if ID is NOT a NUMBER
  if (isNaN(Number(id))) {
    throw new ApiError({ endpoint: req.endpoint })
  }
  next()
})

apiRoutes.get('/api/test', async (req: Request, res: Response) =>
  res.json({ payload: { dummy: 'data' }, success: true })
)

apiRoutes.get('/api/fail', async (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Basic Error'))
})

apiRoutes.get('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    res.json({ payload: { data: `dummy data ${id}` }, success: true })
  } catch (error) {
    next(error)
  }
})

apiRoutes.all('/api/*', async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new UnknownAPIError({ endpoint: req.endpoint })
  } catch (error) {
    next(error)
  }
})

export default apiRoutes
