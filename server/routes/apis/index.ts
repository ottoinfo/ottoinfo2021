import express, { Request, Response, NextFunction } from 'express'
import generalRoutes from './general'
import postRoutes from './post'
import redisRoutes from './redis'
// import userRoutes from './user'
import { UnknownAPIError } from '../../errors'

const catchAllMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new UnknownAPIError({ endpoint: req.endpoint })
  } catch (error) {
    next(error)
  }
}

const apiRoutes = express.Router()
apiRoutes.use(express.json())
apiRoutes.use('/post', postRoutes)
apiRoutes.use('/redis', redisRoutes)
// apiRoutes.use('/user', userRoutes)
apiRoutes.use('/general', generalRoutes)
apiRoutes.all('/*', catchAllMiddleware)

export default apiRoutes
