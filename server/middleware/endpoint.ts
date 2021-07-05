import { NextFunction, Request, Response } from 'express'

// Every REQUEST we want more info => POST:/api/error?query=test
const endpointMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req
  req.endpoint = `${method}:${url}`
  next()
}

export default endpointMiddleware
