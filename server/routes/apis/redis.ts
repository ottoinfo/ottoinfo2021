import express, { Request, Response } from 'express'
import Redis from '../../helpers/redis'

const apiRoutes = express.Router()

apiRoutes.get('/get', async (req: Request, res: Response) => {
  const { key } = req.query
  if (!key) {
    return res.json({ success: false, message: 'no key provided' })
  }
  const data = Redis.get(key)
  res.json({ success: true, data })
})

apiRoutes.get('/set', async (req: Request, res: Response) => {
  const { key, value } = req.query
  const data = Redis.set(key, value)
  res.json({ success: true, data })
})

export default apiRoutes
