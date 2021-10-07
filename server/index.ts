import express from 'express'
import next from 'next'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { PrismaClient } from '@prisma/client'
import attacksMiddleware from './middleware/attacks'
import domainMiddleware from './middleware/domain'
import endpointMiddleware from './middleware/endpoint'
import logger from './middleware/logger'
import errorHandlerMiddlewares from './middleware/errorHandler'
import morganMiddleware from './middleware/morgan'
import unknownRouteMiddleware from './middleware/unknownRoute'
import apiRoutes from './routes/apis'
import simpleRoutes from './routes/simple'
import nextRoutes from './routes/next'

const { API_URL, NODE_ENV, PORT, SITE_URL } = process.env
const isDevelopment = NODE_ENV !== 'production'
const port = PORT || 3000
const nextJS = next({ dev: isDevelopment })
const prisma = new PrismaClient()

declare global {
  namespace Express {
    interface Request {
      endpoint: string
    }
  }
}

nextJS
  .prepare()
  .then(() => {
    const server = express()
    server.set('nextJS', nextJS)
    server.set('prisma', prisma)
    server.use(morganMiddleware)
    if (!isDevelopment) {
      server.use(compression())
    }
    server.use(cookieParser())
    server.use(express.static('public'))
    server.use(endpointMiddleware)
    server.use(attacksMiddleware)
    // API Routes
    server.use(domainMiddleware(API_URL, apiRoutes))
    // Simple Routes
    server.use(domainMiddleware(SITE_URL, simpleRoutes))
    // Next JS Routes
    server.use(domainMiddleware(SITE_URL, nextRoutes))
    // Redirect for Bad URLS - Unknown
    server.use('*', unknownRouteMiddleware)
    // Error Handling Middleware = Array of Middlewares
    server.use(errorHandlerMiddlewares)
    // Server
    server.listen(port, () => {
      logger.debug(`> Ready on http://${SITE_URL}:${port}`) // eslint-disable-line
    })
  })
  .catch((error) => {
    // Handle the error!
    logger.error(`Error Starting App`, { error })
    // Kill Process
    process.exit(1)
  })
