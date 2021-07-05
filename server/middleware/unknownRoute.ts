import { Request, Response } from 'express'

import template from '../template'

/*
 * Redirect for Bad URLS - Unknown Routes
 */
const unknownRouteMiddleware = async (req: Request, res: Response) => {
  res.send(template('<h1>Unknown Route ( NODE )</h1>'))
}

export default unknownRouteMiddleware
