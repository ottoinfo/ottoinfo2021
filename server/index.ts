import express, { Request, Response } from 'express'
import next from 'next'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import attacksMiddleware from './middleware/attacks'
import logger from './middleware/logger'
import errorHandlerMiddleware from './middleware/errorHandler'
import trafficMiddleware from './middleware/morgan'
import unknownRouteMiddleware from './middleware/unknownRoute'
import nextRoutes from './routes'
import template from './template'


const {NODE_ENV, PORT} = process.env
const isDevelopment = NODE_ENV !== 'production'
const port = PORT || 3000
const nextJS = next({ dev: isDevelopment })

nextJS.prepare().then(() => {
  const server = express()
  if (!isDevelopment) {
    server.use(compression())
  }
  console.log({ isDevelopment, NODE_ENV, PORT })
  server.use(cookieParser())
  server.use(attacksMiddleware)
  // server.use(
  //   require('morgan')(isDev ? 'tiny' : 'combined', {
  //     stream: logger.stream,
  //     skip(req: any, res: any) {
  //       return req.path.search(/_next.*/) > -1
  //     },
  //   })
  // )

  server.use(express.static('public'))
  server.get('/debug', (req: Request, res: Response) => {
    logger.info('This is a info log')
    res.send(template('<h1>Check debugging</h1>'))
  })
  server.get('/logging', (req: Request, res: Response) => {
    logger.error('This is an error log')
    logger.warn('This is a warn log')
    logger.info('This is a info log')
    logger.http('This is a http log')
    logger.debug('This is a debug log')
    res.send(template('<h1>Check logs</h1>'))
  })
  server.get('/welcome', (req: Request, res: Response) =>
    res.send(template('<h1>Hello World, welcome to my site!</h1>'))
  )
  server.get('/api', (req: Request, res: Response) =>
    res.json({ payload: { dummy: 'data'}, success: true })
  )
  // Next JS Routes
  server.use(nextRoutes(nextJS))
  // Redirect for Bad URLS - Unknown
  server.use('*', unknownRouteMiddleware)
  // Server
  server.listen(port, () => {
    logger.debug(`> Ready on http://localhost:${port}`) // eslint-disable-line
  })
  // Error Handling Middleware - Array of Middlewares
  server.use(errorHandlerMiddleware)
}).catch((error) => {
  // Handle the error!
  logger.error(`Error Starting App`, { error })
  // Kill Process
  process.exit(1)
})
