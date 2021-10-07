import { NextFunction, Request, Response } from 'express'

// Check Subdomain via Request
const domainMiddleware =
  (domain: string = '', middlewareFn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { hostname } = req
    // console.log({ hostname, domain })
    if (hostname === domain) {
      return middlewareFn(req, res, next)
    }
    return next()
  }

export default domainMiddleware
