/* Redirect for Bad URLS - Unknown Routes
 * Ex: server.use('*', unknownRouteMiddleware)
 */
import { Request, Response } from 'express'

import template from '../template'

const unknownRouteMiddleware = async (req: Request, res: Response) => {
  res.send(template('<h1>Unknown Route</h1>'))
}

export default unknownRouteMiddleware
