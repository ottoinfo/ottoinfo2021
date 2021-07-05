import express, { Request, Response, NextFunction } from 'express'

const nextRoutes = express.Router()

// NextJS Files /_next/( PAGE, _error, main ).js
nextRoutes.get('/_next/*', async (req: Request, res: Response) => {
  const nextJS = req.app.get('nextJS')
  nextJS.getRequestHandler()(req, res)
})

nextRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nextJS = req.app.get('nextJS')
    return nextJS.render(req, res, '/homepage', {
      ...req.params,
      ...req.query,
    })
  } catch (error) {
    return next(error)
  }
})

export default nextRoutes
