import { NextFunction, Request, Response } from 'express'
import { UnknownRouteError } from '../errors'

// import template from '../template'
// res.send(template('<h1>Unknown Route ( NODE )</h1>'))

/*
 * Redirect for Bad URLS - Unknown Routes ( Default NEXT JS Error page)
 */
const unknownRouteMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next(new UnknownRouteError({ endpoint: req.endpoint }))
}

export default unknownRouteMiddleware
