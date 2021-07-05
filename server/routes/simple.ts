import express, { Request, Response } from 'express'
import logger from '../middleware/logger'
import template from '../template'

const simpleRoutes = express.Router()

simpleRoutes.get('/crash', async () => {
  logger.info('crashing app to test DOCKER `auto restart`')
  process.exit(1)
})

simpleRoutes.get('/debug', async (req: Request, res: Response) => {
  logger.info('This is a info log')
  res.send(template('<h1>Check debugging</h1>'))
})

simpleRoutes.get('/logging', async (req: Request, res: Response) => {
  logger.error('This is an error log')
  logger.warn('This is a warn log')
  logger.info('This is a info log')
  logger.http('This is a http log')
  logger.debug('This is a debug log')
  res.send(template('<h1>Check logs</h1>'))
})

simpleRoutes.get('/welcome', async (req: Request, res: Response) =>
  res.send(template('<h1>Hello World, welcome to my site!</h1>'))
)

export default simpleRoutes
