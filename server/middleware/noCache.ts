import { NextFunction, Request, Response } from 'express'

// Never Cache Response
const setNoCacheHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.set('Expires', '-1')
  res.set('Pragma', 'no-cache')
  next()
}

export default setNoCacheHeaders
